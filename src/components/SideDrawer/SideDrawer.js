import React, { Component } from "react";

import classes from "./SideDrawer.css";
import NavigationItems from "../UI/NavigationItems/NavigationItems";
import MobileNav from "./MobileNav/MobileNav";
import BackDrop from "../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary/Auxiliary";

export default class SideDrawer extends Component {
    // state = {
    //     preventDefault: false
    // };
    shouldComponentUpdate (nextProps, _) {
        return nextProps.show || this.props.show;
    }

    // componentDidUpdate () {
    //     this.setState({
    //         preventDefault: !this.state.preventDefault
    //     })
    // }

    render () {
        let attachedClasses = classes.Close;
        if (this.props.show) {
            attachedClasses = classes.Open;
        }
        return (
            <Aux>
                <BackDrop show={this.props.show} backdropClicked={this.props.backdropClicked}/>
                <nav className={classes.SideDrawer + " " + attachedClasses}>
                    <div className={classes.NavLeft}>
                        <span> STUDENT INFORMATION SYSTEM </span>
                    </div>
                    <NavigationItems authenticated={this.props.authenticated} isVerified={this.props.isVerified} login={this.props.login}
                                     verify={this.props.verify} logout={this.props.logout} showSignUp={this.props.showSignUp}/>
                </nav>
                <MobileNav showSideBar={this.props.showSideBar} />
            </Aux>
        );
    }
}