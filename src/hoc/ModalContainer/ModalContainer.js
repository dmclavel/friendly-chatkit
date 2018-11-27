import React, { Component } from 'react';

import Modal from "../../components/UI/LoginModal/LoginModal";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./ModalContainer.css";
import SpinnerModal from "../../components/UI/SpinnerModal/SpinnerModal";
import MainSpinner from "../../components/UI/Spinner/MainSpinner";
import Aux from "../Auxiliary/Auxiliary";

export default class ModalContainer extends Component{
    render () {
        let inputFields = (
            <Aux>
                <div className={classes.InputEmail}>
                    <input type="text" placeholder="Email-address" onChange={this.props.handleEmailChange} value={this.props.emailUserAdd} />
                    <i className={"material-icons " + classes.IconEmail}>email</i>
                </div>
                <div className={classes.InputPassword}>
                    <input type="password" placeholder="Password" onChange={this.props.handlePasswordChange} value={this.props.emailUserPass} />
                    <i className={"material-icons " + classes.IconPassword}>lock_outline</i>
                </div>
            </Aux>
        );
        return (
            <Aux>
                <Modal show={this.props.onShowLoginModal}
                       backdropClicked={this.props.closeLoginModal}>
                    {this.props.modalLoading ?
                        <Spinner modal={true}/>
                        :
                        <div className={classes.LoginModal}>
                            {inputFields}
                            {this.props.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', padding: '0 10px'}}> {this.props.errorLoginMsg} </p>}
                            <div>
                                <div className={classes.padLeftOnModal}>
                                    <span onClick={this.props.showSignUp}> New User? Create an account! </span>
                                </div>
                                <div className={classes.alignRightOnModal}>
                                    <span onClick={this.props.openForgotModal}> Forgot password </span>
                                </div>
                            </div>
                            <button onClick={(event) => this.props.login(event, this.props.emailUserAdd, this.props.emailUserPass)}> Login </button>
                            <button onClick={this.props.closeLoginModal}> Cancel </button>
                        </div>
                    }
                </Modal>
                <Modal show={this.props.onShowSignupModal} backdropClicked={this.props.closeLoginModal}
                    closeModal={this.props.closeLoginModal}>
                    {this.props.modalLoading ?
                        <Spinner modal={true}/>
                        :
                        <div className={classes.LoginModal}>
                            {inputFields}
                            {this.props.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', padding: '0 10px'}}> {this.props.errorLoginMsg} </p>}
                            <button onClick={(event) => this.props.signup(event, this.props.emailUserAdd, this.props.emailUserPass)}> Sign Up </button>
                            <button onClick={this.props.closeLoginModal}> Cancel </button>
                        </div>
                    }
                </Modal>
                <Modal show={this.props.onShowForgotModal} backdropClicked={this.props.closeLoginModal} closeModal={this.props.closeLoginModal}>
                    <h4 style={{color: '#fff', padding: '0 10px', fontWeight: 'bold'}}> Enter the email that you have used to create your account!</h4>
                    <div className={classes.LoginModal}>
                        <div className={classes.InputEmail}>
                            <input type="text" placeholder="Email-address" onChange={this.props.handleEmailChange} value={this.props.emailUserAdd} />
                            <i className={"material-icons " + classes.IconEmail}>email</i>
                        </div>
                        {this.props.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', padding: '0 10px'}}> {this.props.errorLoginMsg} </p>}
                        <button onClick={() => this.props.forgotPassword(this.props.emailUserAdd)}> Submit </button>
                    </div>
                </Modal>
        <Modal show={this.props.onShowSuccessModal} backdropClicked={this.props.closeSuccessModal}
            closeModal={this.closeSuccessModal}>
        <div className={classes.SuccessModal}>
        <strong style={{color: '#CD295A'}}> {this.props.successMessage} </strong>
        <button onClick={this.props.closeSuccessModal}> Done </button>
        </div>
        </Modal>
            <SpinnerModal show={this.props.spinnerModalLoading} backdropClicked={this.props.closeSpinnerModal}>
                <MainSpinner />
                <strong style={{display: 'block', color: '#ccc', textAlign: 'center', fontWeight: 'bolder'}}> The verification e-mail has been sent! </strong>
            </SpinnerModal>
        </Aux>
        );
    }
}