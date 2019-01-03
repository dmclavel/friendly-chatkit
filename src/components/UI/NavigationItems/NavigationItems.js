import React from "react";

import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const navigationItems = (props) => {
    let content = null;
    if (props.authenticated && props.isVerified)
        content = (
            <Aux>
                <NavLink to={"/profile/" + props.uid} activeClassName={classes.active}> Profile </NavLink>
                <NavLink to="/chat" activeClassName={classes.active}> Chat </NavLink>
                <span className={classes.SpanLink} onClick={props.logout}> Logout </span>
            </Aux>
        );
    else if (props.authenticated && !props.isVerified)
        content = (
            <Aux>
                <NavLink to={"/profile/" + user.uid} activeClassName={classes.active}> Profile </NavLink>
                <span className={classes.SpanLink} onClick={props.verify}> Verify Account </span>
                <span className={classes.SpanLink} onClick={props.logout}> Logout </span>
            </Aux>
        );
    return (
        <div className={classes.NavigationItems}>
            <NavLink to="/" exact activeClassName={classes.active}> Home </NavLink>
            <NavLink to="/about" activeClassName={classes.active}> About </NavLink>
            {content}
        </div>
    );
};

export default navigationItems;