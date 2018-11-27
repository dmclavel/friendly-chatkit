import React from "react";

import classes from "./MobileNav.css";

const mobileNav = (props) => {
    return (
        <div className={classes.MobileNav}>
            <div className={classes.MobileNavLeft}>
                <i onClick={props.showSideBar} className="material-icons">drag_handle</i>
            </div>
        </div>
    )
};

export default mobileNav;