import React, {Component, Fragment} from "react";

import classes from "./SideDrawer.css";
import NavigationItems from "../UI/NavigationItems/NavigationItems";
import MobileNav from "./MobileNav/MobileNav";
import BackDrop from "../UI/Backdrop/Backdrop";

const sideDrawer = props => {
    let attachedClasses = classes.Close;
    if (props.show) {
        attachedClasses = classes.Open;
    }
    return (
        <Fragment>
            <BackDrop show={props.show} backdropClicked={props.backdropClicked}/>
            <nav className={classes.SideDrawer + " " + attachedClasses}>
                <div className={classes.NavLeft}>
                    <span> STUDENT INFORMATION SYSTEM </span>
                </div>
                <NavigationItems authenticated={props.authenticated} isVerified={props.isVerified} login={props.login}
                                 verify={props.verify} logout={props.logout} uid={props.uid} />
            </nav>
            <MobileNav showSideBar={props.showSideBar} />
        </Fragment>
    )
};

export default sideDrawer;