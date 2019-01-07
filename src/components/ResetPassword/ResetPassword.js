import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Input from '../Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import classes from './ResetPassword.css';

const resetPassword = (props) => {
    const inlineStyle = {
        background: 'transparent',
        border: '2px solid #fff',
        color: '#fff'
    };

    let resetPasswordHelper = props.willReset ? (
        <div className={classes.ResetSpinner}>
            <Spinner spinnerStyle={{
                fontSize: '2rem', margin: 'auto', color: '#bc9643'
            }}/>
        </div>
    ) : null;

    let errorHelper = (
        <CSSTransition in={props.errorReset !== null} timeout={{ enterActive: '500', exitActive: '1000' }}
                        classNames={{
                            enter: classes.ErrorBeforeShown,
                            enterActive: classes.ErrorShown,
                            exitActive: classes.ErrorClosed,
                            exit: classes.ErrorAfterClosed
                        }} mountOnEnter unmountOnExit>
            <div className={classes.ResetError}>
                <p>{props.errorReset !== null ? `${props.errorReset.message} Please try again!` : null}</p>
            </div>
        </CSSTransition>
    );

    let successHelper = props.successReset ? (
            <div className={classes.ResetSuccess}>
                <p> The password reset e-mail has been sent.  </p>
            </div>
        ): null;

    let matchingHelper =
        props.changeTracked ?
            props.matching ? (
                    <i style={{
                        color: 'green',
                        position: 'absolute',
                        top: '25%',
                        right: '3%'
                    }} className="material-icons">check</i>
                ) : (
                    <i style={{
                        color: 'red',
                        position: 'absolute',
                        top: '25%',
                        right: '3%'
                    }} className="material-icons">clear</i>
                )
        : null;

    return (
        <form onSubmit={(event) => props.resetPassword(event)} className={classes.ResetForm}>
            <p> RESET PASSWORD </p>
            {resetPasswordHelper}
            {errorHelper}
            {successHelper}
            <span>Email Address</span>
            <div style={{position: 'relative'}}>
                <Input type="email" placeholder="" inputStyle={inlineStyle}
                       value={props.emailAddress} changed={props.emailAddressChanged} isRequired={true}/>
                {matchingHelper}
            </div>
            <span> Re-enter Email Address </span>
            <div style={{position: 'relative'}}>
                <Input type="email" placeholder="" inputStyle={inlineStyle}
                       value={props.emailAddressChecker} changed={props.emailAddressCheckerChanged} isRequired={true}/>
                {matchingHelper}
            </div>
            <button style={{cursor: !(props.changeTracked && props.matching) ? 'not-allowed' : null}} disabled={!(props.matching && props.changeTracked) }> Reset </button>
        </form>
    )


};

export default resetPassword;