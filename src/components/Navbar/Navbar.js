import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import fire from '../../config/fire';
import classes from './Navbar.css';

export default class Navbar extends Component {
    render () {
        const user = fire.auth().currentUser;
        let content = (
            <Aux>
                <span onClick={this.props.login}> Login </span>
                <span onClick={this.props.showSignUp}> Register </span>
            </Aux>
        );
    
        if (this.props.authenticated && this.props.isVerified)
            content = (
                <Aux>
                    <NavLink to={"/profile/" + user.uid} activeClassName={classes.active}> Profile </NavLink>
                    <span onClick={this.props.logout}> Logout </span>
                </Aux>
            );
        else if (this.props.authenticated && !this.props.isVerified)
            content = (
                <Aux>
                    <NavLink to={"/profile/" + user.uid} activeClassName={classes.active}> Profile </NavLink>
                    <span onClick={this.props.verify}> Verify Account </span>
                    <span onClick={this.props.logout}> Logout </span>
                </Aux>
            );
        return (
            <nav className={classes.Navbar}>
                <div className={classes.NavLeft}>
                    <span> STUDENT INFORMATION SYSTEM </span>
                </div>
                <div className={classes.NavRight}>
                    <NavLink to="/" exact activeClassName={classes.active}> Home </NavLink>
                    <NavLink to="/student" activeClassName={classes.active}> Student Section </NavLink>
                    <NavLink to="/about" activeClassName={classes.active}> About </NavLink>
                    {content}
                </div>
            </nav>
        );
    }
}