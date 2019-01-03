import React from 'react';
import Input from '../Input/Input';

import classes from './Signup.css';

const signUp = (props) => (
    <form onSubmit={(event) => props.signUp(event)} className={classes.SignUp}>
        <p> SIGN UP </p>
        <Input type="text" placeholder="E-mail address"
               value={props.emailAddress} changed={props.emailChanged} isRequired={true} />
        <Input type="password" placeholder="Password"
               value={props.password} changed={props.passwordChanged} isRequired={true} />
        <button> Sign Up </button>
    </form>
);

export default signUp;