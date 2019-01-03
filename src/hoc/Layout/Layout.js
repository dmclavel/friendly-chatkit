import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

const layout = props => {
    return (
        <Fragment>
            <Navbar authenticated={props.isAuthenticated}
                    isVerified={props.isVerified}
                    logout={props.logout}
                    verify={props.verify}
                    uid={props.uid} />
            <SideDrawer authenticated={props.isAuthenticated}
                        isVerified={props.isVerified}
                        logout={props.logout}
                        verify={props.verify}
                        uid={props.uid} />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
};

export default layout;