import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { encrypt } from './utils/password-encrypt/encrypt';
import { generateUsername } from './utils/generateUsername/genUser';

import fire from './config/fire';
import Aux from './hoc/Auxiliary/Auxiliary';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/LoginModal/LoginModal';
import SpinnerModal from './components/UI/SpinnerModal/SpinnerModal';
import MainSpinner from './components/UI/Spinner/MainSpinner';

import StudentWindow from './containers/StudentWindow/Student';
import About from './containers/About/About';
import Profile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';

import classes from './App.css';

class App extends Component {
  state = {
    user: {},
    isAuthenticated: false,
    isVerified: false,
    students: null,
    studentInfo: {},
    emailUserAdd: '',
    emailUserPass: '',
    errorLoginMsg: null,
    successMessage: null,
    loading: true,
    modalLoading: false,
    spinnerModalLoading: false,
    showInfo: false,
    showInfoLoading: false,
    inEditMode: false,
    onShowLoginModal: false,
    onShowSignupModal: false,
    onShowSuccessModal: false,
  };

  componentDidMount() {
    this.authListener();
  }

  authListener () {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified){
          this.setState({ user, isVerified: true, isAuthenticated: true });
          fire.database().ref('usersLoggedIn/' + user.uid).set({
            email: user.email
          })
          .then(res => {
            fire.database().ref('usersData/' + user.uid).update({
                emailVerified: user.emailVerified
            });
          })
          .catch(err => {
            // console.log(err);
          });
        } else  {
          this.setState({ user, isAuthenticated: true });
        }

        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  };

  showLoginModal = () => {
    this.setState({
        onShowLoginModal: true
    });
};

showSignUp = () => {
    this.setState({
        onShowSignupModal: true
    });
};

closeLoginModal = () => {
    this.setState({
        emailUserAdd: '',
        emailUserPass: '',
        onShowLoginModal: false,
        onShowSignupModal: false,
        errorLoginMsg: null
    });
};

closeSuccessModal = () => {
    this.setState({
        onShowSuccessModal: false,
        successMessage: null
    });
};

closeSpinnerModal = () => {
    this.setState({
        spinnerModalLoading: false
    });
};

handleEmailChange = (event) => {
    this.setState({ emailUserAdd: event.target.value });
};

handlePasswordChange = (event) => {
    this.setState({ emailUserPass: event.target.value });
};

login = async (event, email, password) => {
    event.preventDefault();
    await this.setState({ modalLoading: true });
    await fire.auth().signInWithEmailAndPassword(email, password)
      .then(userState => {
        this.setState({ 
            modalLoading: false,
            onShowLoginModal: false,
            errorLoginMsg: null,
            emailUserAdd: '',
            emailUserPass: '' 
        });
        fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
            email
        })
        .then(() => {})
        .catch(() => {});
      })
      .catch(error => {
        this.setState({
            emailUserAdd: '',
            emailUserPass: '', 
            errorLoginMsg: error.message, 
            modalLoading: false
        });
      });
    
    if (!this.state.onShowLoginModal)
      window.location.reload(false);
  };

  signup = async (event, email, password) => {
    event.preventDefault();
    let hashedPass, generatedUsername = '', accountCreated;
    const now = new Date().toString();
    accountCreated = 'Account created on ' + now;
    encrypt(password)
        .then(hash => {
            hashedPass = hash;
        })
        .catch(err => {
            // console.log(err);
        });

    await this.setState({ modalLoading: true });
    await fire.auth().createUserWithEmailAndPassword(email, password)
        .then(async userState => {
            await generateUsername()
                .then(username => {
                    generatedUsername = username;
                })
                .catch(err => {
                    // console.log(err);
                });

            const user = fire.auth().currentUser;

            fire.database().ref('usersLoggedIn/' + user.uid).set({
                email
            })
            .then(() => {})
            .catch((err) => { 
                // console.log(err);
            });

            fire.database().ref('usersData/' + user.uid).set({
                displayName: generatedUsername,
                email: user.email,
                password: hashedPass,
                emailVerified: user.emailVerified,
                phoneNumber: '',
                photoURL: 'https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png',
                metaData: accountCreated
            })
            .then(() => {})
            .catch(err => {
                // console.log(err);
            });

            this.setState({
                modalLoading: false,
                onShowSignupModal: false,
                onShowSuccessModal: true,
                successMessage: 'Successfully signed up!',
                errorLoginMsg: null,
                emailUserAdd: '',
                emailUserPass: ''
            });
        })
        .catch(error => {
            this.setState({
                emailUserAdd: '',
                emailUserPass: '', 
                errorLoginMsg: error.message, 
                modalLoading: false
            });
        });
    
    if (this.state.onShowSuccessModal) {
        setTimeout(() => {
            window.location.reload(false);
        }, 3000);
    }
  };

  verify = () => {
    const user = fire.auth().currentUser;

    this.setState({ spinnerModalLoading: true });
    user.sendEmailVerification()
        .then(res => {

        })
        .catch(err => {

        });
  };

  logout = async () => {
    await this.setState({ isVerified: false, isAuthenticated: false });
    await fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
      email: null
    })
    .then(res => {
      
    })
    .catch(err => {
    //   console.log(err);
    });
    await fire.auth().signOut();
    this.props.history.push('/');
    // window.location.reload(false);
  };

  render() {
    return (
        <Aux>
          <Navbar login={this.showLoginModal} logout={this.logout}
                  showSignUp={this.showSignUp} signup={this.signup}
                  verify={this.verify} authenticated={this.state.isAuthenticated}
                  isVerified={this.state.isVerified} />
          <Modal show={this.state.onShowLoginModal}
                  backdropClicked={this.closeLoginModal}>
              {this.state.modalLoading ?
                  <Spinner modal={true}/>
                  :
                  <div className={classes.LoginModal}>
                      <input type="text" placeholder="Email-address" onChange={this.handleEmailChange} value={this.state.emailUserAdd} />
                      <input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.emailUserPass} />
                      {this.state.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', textAlign: 'center'}}> {this.state.errorLoginMsg} </p>}
                      <button onClick={(event) => this.login(event, this.state.emailUserAdd, this.state.emailUserPass)}> Login </button>
                      <button onClick={this.closeLoginModal}> Cancel </button>
                  </div> 
              }
          </Modal>
          <Modal show={this.state.onShowSignupModal} backdropClicked={this.closeLoginModal}
                  closeModal={this.closeLoginModal}>
              {this.state.modalLoading ?
                  <Spinner modal={true}/>
                  :
                  <div className={classes.LoginModal}>
                      <input type="text" placeholder="Email-address" onChange={this.handleEmailChange} value={this.state.emailUserAdd} />
                      <input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.emailUserPass} />
                      {this.state.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', textAlign: 'center'}}> {this.state.errorLoginMsg} </p>}
                      <button onClick={(event) => this.signup(event, this.state.emailUserAdd, this.state.emailUserPass)}> Sign Up </button>
                      <button onClick={this.closeLoginModal}> Cancel </button>
                  </div> 
              }
          </Modal>
          <Modal show={this.state.onShowSuccessModal} backdropClicked={this.closeSuccessModal}
                  closeModal={this.closeSuccessModal}>
              <div className={classes.SuccessModal}>
                  <strong style={{color: '#CD295A'}}> {this.state.successMessage} </strong>
                  <button onClick={this.closeSuccessModal}> Done </button>
              </div>
          </Modal>
          <SpinnerModal show={this.state.spinnerModalLoading} backdropClicked={this.closeSpinnerModal}>
              <MainSpinner />
              <strong style={{display: 'block', color: '#ccc', textAlign: 'center', fontWeight: 'bolder'}}> The verification e-mail has been sent! </strong>
          </SpinnerModal>
          <Switch>
              <Route path="/profile/:id" render={() => <Profile isAuthenticated={this.state.isAuthenticated} isVerified={this.state.isVerified} />} />
              <Route path="/about" component={About} />
              <Route path="/student" render={() => <StudentWindow {...this.state} />}/>
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
          </Switch>
        </Aux>
    );
  }
}

export default withRouter(App);
