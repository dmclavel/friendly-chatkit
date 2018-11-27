import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { encrypt } from './utils/password-encrypt/encrypt';
import { generateUsername } from './utils/generateUsername/genUser';

import fire from './config/fire';
import Aux from './hoc/Auxiliary/Auxiliary';
import Navbar from './components/Navbar/Navbar';
import ModalContainer from './hoc/ModalContainer/ModalContainer';

import StudentWindow from './containers/StudentWindow/Student';
import About from './containers/About/About';
import Profile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import SideDrawer from "./components/SideDrawer/SideDrawer";

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
      onShowForgotModal: false,
      showSideBar: false
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

  showLoginModalMobile = () => {
      this.setState({
          onShowLoginModal: true,
          showSideBar: !this.state.showSideBar
      });
  };

showSignUp = () => {
    this.setState({
        onShowSignupModal: true
    });
};

showSignUpOptimized = () => {
  this.setState({
      onShowLoginModal: false,
      emailUserAdd: '',
      emailUserPass: '',
      errorLoginMsg: null,
      onShowSignupModal: true
  });
};

showSignUpMobile = () => {
    this.setState({
        onShowSignupModal: true,
        showSideBar: !this.state.showSideBar
    });
};

closeLoginModal = () => {
    this.setState({
        emailUserAdd: '',
        emailUserPass: '',
        onShowLoginModal: false,
        onShowSignupModal: false,
        onShowForgotModal: false,
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

openForgotModal = () => {
  this.setState({
      onShowForgotModal: true,
      emailUserAdd: '',
      emailUserPass: '',
      errorLoginMsg: null,
      onShowLoginModal: false
  });
};

forgotPassword = (emailAddress) => {
    fire.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            this.setState({
               onShowForgotModal: false,
                emailUserAdd: '',
                emailUserPass: '',
                errorLoginMsg: null
            });
        })
        .catch((error) => {
            this.setState({
                emailUserAdd: '',
                emailUserPass: '',
                errorLoginMsg: error.message
            });
        });
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

    this.setState({ spinnerModalLoading: true, showSideBar: !this.state.showSideBar });
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
    window.location.reload(false);
  };

  showSideBar = () => {
    this.setState({
        showSideBar: !this.state.showSideBar
    });
  };

  render() {
    return (
        <Aux>
          <Navbar login={this.showLoginModal} logout={this.logout}
                  showSignUp={this.showSignUp} signup={this.signup}
                  verify={this.verify} authenticated={this.state.isAuthenticated}
                  isVerified={this.state.isVerified} />
            <SideDrawer show={this.state.showSideBar} login={this.showLoginModalMobile} logout={this.logout}
                    showSignUp={this.showSignUpMobile} signup={this.signup}
                    verify={this.verify} authenticated={this.state.isAuthenticated}
                    isVerified={this.state.isVerified} showSideBar={this.showSideBar} backdropClicked={this.showSideBar}/>
            <ModalContainer handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange} onShowLoginModal={this.state.onShowLoginModal}
            closeLoginModal={this.closeLoginModal} emailUserAdd={this.state.emailUserAdd} emailUserPass={this.state.emailUserPass} errorLoginMsg={this.state.errorLoginMsg}
            login={(event, user, password) => this.login(event, user, password)} onShowSignupModal={this.state.onShowSignupModal} modalLoading={this.state.modalLoading}
            signup={(event, user, password) => this.signup(event, user, password)} onShowSuccessModal={this.state.onShowSuccessModal} closeSuccessModal={this.state.closeSuccessModal}
            successMessage={this.state.successMessage} spinnerModalLoading={this.state.spinnerModalLoading} closeSpinnerModal={this.closeSpinnerModal} showSignUp={this.showSignUpOptimized}
            forgotPassword={(emailAddress) => this.forgotPassword(emailAddress)} openForgotModal={this.openForgotModal} onShowForgotModal={this.state.onShowForgotModal}/>
          <Switch>
              <Route path="/profile/:id" exact render={() => <Profile isAuthenticated={this.state.isAuthenticated} isVerified={this.state.isVerified} />} />
              <Route path="/about" exact component={About} />
              <Route path="/student" exact render={() => <StudentWindow {...this.state} />}/>
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
          </Switch>
        </Aux>
    );
  }
}

export default withRouter(App);
