import React from "react";

import classes from "./MobileNav.css";

const mobileNav = (props) => {
    return (
        <div className={classes.MobileNav}>
            <div className={classes.MobileNavLeft}>
                <i onClick={props.showSideBar} className="material-icons">dehaze</i>
            </div>
        </div>
    )
};

export default mobileNav;