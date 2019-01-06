import React from 'react';
import Input from '../Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Login.css';

const login = (props) => {
    let loginHelper = props.willLogin ? (
        <div className={classes.LoginSpinner}>
                <Spinner spinnerStyle={{
                fontSize: '2rem', margin: 'auto', color: '#bc9643'
            }}/>
        </div>
    ) : null;
    const errorHelper = (
        <CSSTransition in={props.errorLogin !== null} classNames={{
            enterActive: classes.ErrorShown,
            exitActive: classes.ErrorClosed
        }} timeout={{ enter: 400, exit: 600 }} mountOnEnter unmountOnExit>
            <div className={classes.LoginError}>
                <p>{props.errorLogin !== null ? `${props.errorLogin.message} Please try again!` : null}</p>
            </div>
        </CSSTransition>
    );

    return (
        <form onSubmit={(event) => props.login(event)} className={classes.LoginForm}>
            <p> SIGN IN </p>
            {loginHelper}
            {errorHelper}
            <Input type="email" placeholder="E-mail address"
                   value={props.emailAddress} changed={props.emailChanged} isRequired={true}/>
            <Input type="password" placeholder="Password"
                   value={props.password} changed={props.passwordChanged} isRequired={true}/>
            <p style={{fontFamily: 'Lato, sans-serif', fontSize: '0.8rem',
                textAlign: 'right', margin: '0 0.5rem 0.5rem 1rem', cursor: 'pointer'}}
                onClick={props.triggerResetPasswordModal}> Forgot password? </p>
            <button> Login</button>
        </form>
    )
};

export default login;