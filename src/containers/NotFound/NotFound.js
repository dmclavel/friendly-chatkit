import React, { Component } from 'react';

import classes from './NotFound.css';
import homeImg from '../../assets/home.jpg';

class NotFound extends Component {
    render () {
        return (
            <div className={classes.NotFound}>
                <img src={homeImg} alt="home_img" />
            </div>
        );
    }
}

export default NotFound;