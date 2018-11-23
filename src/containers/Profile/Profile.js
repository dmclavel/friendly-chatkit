import React, { Component } from 'react';

import { getUserData } from '../../utils/getUserData/getUserData';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Profile.css';

export default class Profile extends Component {
    state = {
        userProfile: {},
        loading: true
    };

    componentDidMount() {
        setTimeout(() => { //could have a better fix instead of delaying to give authListener enough time to store user uid
            getUserData().then(uData => {
                this.setState({ userProfile: uData, loading: false });
            })
            .catch(err => {
                // console.log(err);
            });
        }, 3000);
    }

    componentWillUnmount () {
        this.setState({
            userProfile: {},
        });
    }

    render () {
        const verifiedURL = 'https://www.continent8.com/wp-content/uploads/2017/10/tick-icon.png';
        let content = <Spinner />;
        if (!this.state.loading) {
            content = (
                <div className={classes.ProfileWindow__Main}>
                    <div className={classes.ProfileWindow__Main__ProfilePic}>
                        <img src={this.state.userProfile.photoURL} alt={this.state.userProfile.displayName + '-profile'} />
                        <img style={{
                            display: this.props.isVerified ? 'block' : 'none',
                        }} className={classes.ProfileWindow__Main__Verified}
                        src={verifiedURL} alt="verified-check" />
                        <span> {this.state.userProfile.displayName} </span>
                    </div>
                    <div className={classes.ProfileWindow__Main__MetaData}>
                        <span className={classes.Highlight}> Description </span>
                        <div className={classes.MobileBorder}>
                            <span> {this.state.userProfile.metaData} </span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={classes.ProfileWindow}>
                {content}
            </div>
        );
    }
}