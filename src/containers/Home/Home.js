import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, signUp, resetErrors, startResetPassword } from '../../store/actions/index';

import Login from '../../components/Login/Login';
import SignUp from '../../components/Signup/Signup';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import ResetModal from '../../components/UI/ResetModal/ResetModal';
import AmiciImg from '../../assets/Optimized-amici.jpg';
import classes from './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            registerEmailAddress: '',
            registerPassword: '',
            registerUsername: '',
            registerMobileNumber: '',
            resetPasswordEmail: '',
            resetPasswordEmailChecker: '',
            matching: false,
            changeTracked: false,
            showModal: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegisterEmail = this.handleRegisterEmail.bind(this);
        this.handleRegisterPassword = this.handleRegisterPassword.bind(this);
        this.handleRegisterMobileNum = this.handleRegisterMobileNum.bind(this);
        this.handleRegisterUsername = this.handleRegisterUsername.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.handlerResetPasswordChecker = this.handlerResetPasswordChecker.bind(this);
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

    handleRegisterMobileNum(e) {
        this.setState({ registerMobileNumber: e.target.value });
    }

    handleRegisterUsername(e) {
        this.setState({ registerUsername: e.target.value });
    }

    async handleResetPassword(e) {
        await this.setState({ resetPasswordEmail: e.target.value });
        this.checkForChanges();
        if (this.state.resetPasswordEmailChecker === this.state.resetPasswordEmail)
            this.setState({ matching: true });
        else
            this.setState({ matching: false });
    }

    async handlerResetPasswordChecker(e) {
        await this.setState({ resetPasswordEmailChecker: e.target.value });
        this.checkForChanges();
        if (this.state.resetPasswordEmailChecker === this.state.resetPasswordEmail)
            this.setState({ matching: true });
        else
            this.setState({ matching: false });
    }

    checkForChanges = () => {
        if (this.state.resetPasswordEmailChecker.trim() !== '' && this.state.resetPasswordEmail.trim() !== '')
            this.setState({ changeTracked: true });
        else
            this.setState({ changeTracked: false, matching: false });
    };

    clearLocalLoginState = () => {
        this.setState({ emailAddress: '', password: '' });
    };

    clearLocalSignupState = () => {
        this.setState({ registerEmailAddress: '', registerPassword: '',
            registerUsername: '', registerMobileNumber: '' });
    };

    clearLocalResetPasswordState = () => {
        this.setState({ resetPasswordEmail: '', resetPasswordEmailChecker: '',
                                matching: false, changeTracked: false});
    };

    triggerResetModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    };

    componentWillUnmount() {
        if (!this.props.isAuthenticated)
            this.props.onResetErrors();
    }

    render () {
        let homeContent = (
            <div className={classes.Home}>
                <ResetModal show={this.state.showModal} backdropClicked={() => {
                    this.props.onResetErrors();
                    this.clearLocalResetPasswordState();
                    this.triggerResetModal();
                }}>
                    <ResetPassword emailAddress={this.state.resetPasswordEmail} emailAddressChanged={this.handleResetPassword} matching={this.state.matching}
                                   emailAddressChecker={this.state.resetPasswordEmailChecker} emailAddressCheckerChanged={this.handlerResetPasswordChecker}
                                    changeTracked={this.state.changeTracked} resetPassword={(event) => {
                                        this.clearLocalResetPasswordState();
                                        this.props.onResetPassword(event, this.state.resetPasswordEmail);
                                    }} willReset={this.props.willReset} errorReset={this.props.errorPasswordReset} successReset={this.props.successReset} />
                </ResetModal>
                <div className={classes.Darker}>
                    <img src={AmiciImg} alt="homepage-img" />
                </div>
                <div className={classes.Forms}>
                    <Login emailAddress={this.state.emailAddress} willLogin={this.props.willLogin}
                           emailChanged={this.handleEmailChange} errorLogin={this.props.errorLogin}
                           password={this.state.password} triggerResetPasswordModal={this.triggerResetModal}
                           passwordChanged={this.handlePasswordChange}
                           login={(event) => {
                               this.clearLocalLoginState();
                               this.props.onLogin(event, this.state.emailAddress, this.state.password);
                           }} />
                    <p> OR </p>
                    <SignUp emailAddress={this.state.registerEmailAddress} mobileNumber={this.state.registerMobileNumber}
                            emailChanged={this.handleRegisterEmail} username={this.state.registerUsername}
                            password={this.state.registerPassword}  mobileNumChanged={this.handleRegisterMobileNum}
                            passwordChanged={this.handleRegisterPassword}   usernameChanged={this.handleRegisterUsername}
                            signUp={(event) => {
                                this.clearLocalSignupState();
                                this.props.onSignUp(event, this.state.registerEmailAddress, this.state.registerPassword,
                                    this.state.registerUsername, this.state.registerMobileNumber);
                            }}
                            willSignup={this.props.willSignup} errorSignup={this.props.errorSignup} />
                </div>
            </div>
        );

        if (this.props.isAuthenticated)
            homeContent = <div style={{margin: '10rem'}}> Authenticated </div>;

        return homeContent;
    }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      willLogin: state.auth.willLogin,
      errorLogin: state.auth.errorLogin,
      willSignup: state.auth.willSignup,
      errorSignup: state.auth.errorSignup,
      willReset: state.auth.willReset,
      successReset: state.auth.successReset,
      errorPasswordReset: state.auth.errorPasswordReset
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: (event, email, password) => dispatch(login(event, email, password)),
      onSignUp: (event, email, password, username, mobileNumber) => dispatch(signUp(event, email, password, username, mobileNumber)),
      onResetErrors: () => dispatch(resetErrors()),
      onResetPassword: (event, email) => dispatch(startResetPassword(event, email))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);