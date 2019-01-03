import React from 'react'

import classes from './Navbar.css';
import NavigationItems from "../UI/NavigationItems/NavigationItems";

const navbar = props => {
    return (
        <nav className={classes.Navbar}>
            <div className={classes.NavLeft}>
            <span> AMICI </span>
            </div>
            <NavigationItems authenticated={props.authenticated} isVerified={props.isVerified} login={props.login}
                verify={props.verify} logout={props.logout} uid={props.uid} />
        </nav>
    )
};

export default navbar;