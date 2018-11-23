import React, { Component } from 'react';

import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow';
import StudentLeftWindowEdit from '../../components/StudentInfoWindow/StudentLeftWindowEdit';
import StudentRightWindow from '../../components/StudentInfoWindow/StudentRightWindow';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Student.css';
import * as Sentry from '@sentry/browser';
import fire from '../../config/fire';

class Student extends Component {
    state = {
        students: null,
        studentInfo: {},
        loading: false,
        inEditMode: false,
        showInfoLoading: false
    };

    componentDidMount () {
        this.setState({loading: true});
        fire.database().ref('studentsData').on('value', (snapshot) => {
            this.setState({
                students: snapshot.val(),
                loading: false
            });
        }, 
        () => {
            this.setState({ loading: false });
        });
    }

    componentWillUnmount () {
        this.setState({
            students: null,
            studentInfo: {},
            loading: false,
            inEditMode: false,
            showInfoLoading: false
        });
    }

    componentDidCatch (error, errorInfo) {
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    handleDataClick = (stdKey) => {
        this.setState({showInfoLoading: true});
        fire.database().ref('studentsData/' + stdKey).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    studentInfo: snapshot.val(),
                    showInfo: true,
                    showInfoLoading: false
                });
            }
        },
        (error) => {
            console.log(error);
        });
    };

    handleEdit = (id) => {
        if (Object.keys(this.state.studentInfo).length !== 0) {
            this.setState({
                inEditMode: true
            });
        } else {
            alert('Click any student data on the right part of the screen first!');
        }
    };

    handleInfoChange = (event, id, key) => {
        const students = {...this.state.students};
        const studObject = {...this.state.studentInfo};
        studObject[key] = event.target.value;
        students[id] = studObject;

        this.setState({
            studentInfo: studObject,
            students: students
        });
    };

    submitChange = (id) => {
        if (fire.auth().currentUser !== null && this.props.isVerified) {
            fire.database().ref('studentsData/' + id).set({
                ...this.state.studentInfo
            })
            .then(res => {
                this.setState({ inEditMode: false })
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert('Verified users can only edit data.');
        }
    };

    cancelEdit = (id) => {
        this.setState({
            inEditMode: false
        });
    };

    render () {
        let content = null;
        let studentInfo = <StudentLeftWindow studentInfo={this.state.studentInfo} edit={(id) => this.handleEdit(id)}/>;

        if(this.state.inEditMode)
            studentInfo = (
                <StudentLeftWindowEdit studentInfo={this.state.studentInfo}
                                       done={(id) => this.submitChange(id)}
                                       cancel={(id) => this.cancelEdit(id)}
                                       changed={(event, id, key) => this.handleInfoChange(event, id, key)}/>
            );

        if(this.state.showInfoLoading) {
            studentInfo = <Spinner/>;
        }


        if (!this.state.loading) {
            content = <StudentRightWindow  authenticated={this.props.isAuthenticated}
                                            isVerified={this.props.isVerified}
                                            studentData={this.state.students}
                                          clicked={stdKey => this.handleDataClick(stdKey)}/>;
        } else {
            content = <Spinner/>;
        }
        
        return (
            <Aux>
                <div className={classes.Student}>
                    {studentInfo}
                    {content}
                </div>
            </Aux>
        );

    }
}

export default Student;