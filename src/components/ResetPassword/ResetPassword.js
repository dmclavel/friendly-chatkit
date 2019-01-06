import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Input from '../Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import classes from './ResetPassword.css';

const resetPassword = (props) => {
    let resetPasswordHelper = props.willReset ? (
        <div className={classes.ResetSpinner}>
            <Spinner spinnerStyle={{
                fontSize: '2rem', margin: 'auto', color: '#bc9643'
            }}/>
        </div>
    ) : null;

    let errorHelper = (
        <CSSTransition in={props.errorReset !== null} timeout={300}
                        classNames={{
                            enterActive: classes.ErrorShown,
                            exitActive: classes.ErrorClosed
                        }} mountOnEnter unmountOnExit>
            <div className={classes.ResetError}>
                <p>{props.errorReset !== null ? `${props.errorReset.message} Please try again!` : null}</p>
            </div>
        </CSSTransition>
    );

    return (
        <form onSubmit={(event) => props.resetPassword(event)} className={classes.ResetForm}>
            <p> RESET PASSWORD </p>
            {resetPasswordHelper}
            {errorHelper}
            <Input type="email" placeholder="Enter the email address that you have used with the password..."
                   value={props.emailAddress} changed={props.emailAddressChanged} isRequired={true}/>
            <button> Reset </button>
        </form>
    )


};

export default resetPassword;