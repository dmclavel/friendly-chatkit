import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../../store/actions/index';

import Login from '../../components/Login/Login';
import SignUp from '../../components/Signup/Signup';
import classes from './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            registerEmailAddress: '',
            registerPassword: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegisterEmail = this.handleRegisterEmail.bind(this);
        this.handleRegisterPassword = this.handleRegisterPassword.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ emailAddress: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleRegisterEmail(e) {
        this.setState({ registerEmailAddress: e.target.value });
    }

    handleRegisterPassword(e) {
        this.setState({ registerPassword: e.target.value });
    }

    render () {
        let homeContent = (
            <div className={classes.Home}>
                <div className={classes.Darker}>
                    <img src={require("../../assets/amici.jpg")} alt="homepage-img" />
                </div>
                <div className={classes.Forms}>
                    <Login emailAddress={this.state.emailAddress}
                           emailChanged={this.handleEmailChange}
                           password={this.state.password}
                           passwordChanged={this.handlePasswordChange}
                           login={(event) => this.props.onLogin(event, this.state.emailAddress, this.state.password)} />
                    <p> OR </p>
                    <SignUp emailAddress={this.state.registerEmailAddress}
                            emailChanged={this.handleRegisterEmail}
                            password={this.state.registerPassword}
                            passwordChanged={this.handleRegisterPassword}
                            signUp={(event) => this.props.onSignUp(event, this.state.emailAddress, this.state.password)} />
                </div>

            </div>
        );
        // if (this.props.isAuthenticated)
        //     homeContent = <div> Authenticated </div>;
        return homeContent;
    }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: (event, email, password) => dispatch(login(event, email, password)),
      onSignUp: (event, email, password) => dispatch(signUp(event, email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);