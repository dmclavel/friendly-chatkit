import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { authListen, logout, tryToVerify } from './store/actions/index';

import Home from './containers/Home/Home';
import LazyLoad from './hoc/AsyncComponent/LazyLoad';
import Layout from './hoc/Layout/Layout';

const Profile = LazyLoad(() => import('./containers/Profile/Profile'));
const About = LazyLoad(() => import('./containers/About/About'));
const Chat = LazyLoad(() => import('./containers/Chat/Chat'));
const NotFound = LazyLoad(() => import('./containers/NotFound/NotFound'));

class App extends Component {
    componentDidMount() {
        this.props.onAuthListen();
    }

    render() {
        return (
            <Layout isAuthenticated={this.props.isAuthenticated} isVerified={this.props.isVerified}
                    logout={this.props.onLogout} verify={this.props.onVerify} uid={this.props.userId}>
                <Switch>
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/about" component={About} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/" exact component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
        isVerified: state.auth.isVerified
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthListen: () => dispatch(authListen()),
        onLogout: () => dispatch(logout()),
        onVerify: () => dispatch(tryToVerify())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));