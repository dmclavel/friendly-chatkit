import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Input from '../Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Signup.css';

const signUp = (props) => {
    let signupHelper = props.willSignup ? (
        <div className={classes.SignupSpinner}>
            <Spinner spinnerStyle={{
                fontSize: '2rem', margin: 'auto', color: '#bc9643'
            }}/>
        </div>
    ) : null;

    let errorHelper = (
        <CSSTransition in={props.errorSignup !== null} classNames={{
            enterActive: classes.ErrorShown,
            exitActive: classes.ErrorClosed
        }} timeout={{ enter: 400, exit: 600 }} mountOnEnter unmountOnExit>
            <div className={classes.SignupError}>
                <p>{props.errorSignup !== null ? `${props.errorSignup.message} Please try again!` : null}</p>
            </div>
        </CSSTransition>
    );

    return (
        <form onSubmit={(event) => props.signUp(event)} className={classes.SignUp}>
            <p> SIGN UP </p>
            {signupHelper}
            {errorHelper}
            <Input type="text" placeholder="Username"
                   value={props.username} changed={props.usernameChanged} isRequired={true} />
            <Input type="tel" placeholder="Mobile Number (Optional)"
                   value={props.mobileNumber} changed={props.mobileNumChanged} isRequired={false} />
            <Input type="email" placeholder="E-mail address"
                   value={props.emailAddress} changed={props.emailChanged} isRequired={true} />
            <Input type="password" placeholder="Password"
                   value={props.password} changed={props.passwordChanged} isRequired={true} />
            <button> Sign Up </button>
        </form>
    )
};

export default signUp;