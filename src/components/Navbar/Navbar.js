import React, { Component } from 'react'

import classes from './Navbar.css';
import NavigationItems from "../UI/NavigationItems/NavigationItems";

export default class Navbar extends Component {
    render () {
        return (
            <nav className={classes.Navbar}>
                <div className={classes.NavLeft}>
                    <span> AMICI </span>
                </div>
                <NavigationItems authenticated={this.props.authenticated} isVerified={this.props.isVerified} login={this.props.login}
                                 verify={this.props.verify} logout={this.props.logout} showSignUp={this.props.showSignUp}/>
            </nav>
        );
    }
}