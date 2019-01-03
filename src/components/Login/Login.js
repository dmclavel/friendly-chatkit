import React from 'react';
import Input from '../Input/Input';

import classes from './Login.css';

const login = (props) => (
    <form onSubmit={(event) => props.login(event)} className={classes.LoginForm}>
        <p> SIGN IN </p>
        <Input type="text" placeholder="E-mail address"
            value={props.emailAddress} changed={props.emailChanged} isRequired={true} />
        <Input type="password" placeholder="Password"
               value={props.password} changed={props.passwordChanged} isRequired={true} />
        <button> Login </button>
    </form>
);

export default login;