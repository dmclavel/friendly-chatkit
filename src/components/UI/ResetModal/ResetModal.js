import React, { Fragment } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';
import classes from './ResetModal.css';

const resetModal = (props) => {
    return (
        <Fragment>
            <CSSTransition in={props.show} classNames={{
                                enterActive: classes.ShowModal,
                                exitActive: classes.CloseModal
                            }} timeout={300}
                           mountOnEnter unmountOnExit>
                <div className={classes.Modal}>
                    {props.children}
                </div>
            </CSSTransition>
            <Backdrop show={props.show} backdropClicked={props.backdropClicked}/>
        </Fragment>
    )
};

export default resetModal;