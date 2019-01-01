import React, { Component } from 'react';

import classes from './Home.css';
import homeImg from '../../assets/home.jpg';

export default class Home extends Component {
    render () {
        return (
          <div>
              <h1 style={{textAlign: 'center'}}>HOME</h1>
              <img src={homeImg} alt="home_img" />
          </div>
        );
    }
}