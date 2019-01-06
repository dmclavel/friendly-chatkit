import fire from '../../config/fire';
import * as actionTypes from './actionTypes';

const addUsersLoggedIn = (email) => {
    fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
        email
    }).then(() => {});
};

export const startVerification = () => {
    return {
        type: actionTypes.TRYTOVERIFY
    }
};

export const verificationFailed = (error) => {
    return {
        type: actionTypes.VERIFYFAILED,
        error
    }
};

export const tryToVerify = () => {
    return dispatch => {
        dispatch(startVerification());
        fire.auth().currentUser.sendEmailVerification()
            .then(() => {

            })
            .catch(error => {
                dispatch(verificationFailed(error));
            });
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUTSUCCESS
    }
};

export const logout = () => {
    return async dispatch => {
        await fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
            email: null
        }).then(() => {}).catch(() => {});
        fire.auth().signOut()
            .then(() => {
                dispatch(logoutSuccess());
            })
            .catch(error => {console.log(error.message)});
    }
};

export const authenticated = (userId, isVerified, verificationReload) => {
    return {
        type: actionTypes.AUTHENTICATED,
        userId,
        isVerified,
        verificationReload
    }
};

export const unauthenticated = () => {
    return {
        type: actionTypes.UNAUTHENTICATED
    }
};

export const authListen = () => {
    return dispatch => {
        fire.auth().onAuthStateChanged(user => {

           if (user) {
               user.reload()
                   .then(() => {
                       console.log(`Is Verified: ${user.emailVerified}`);
                       if (user.emailVerified)
                           dispatch(authenticated(user.uid, user.emailVerified, true));
                       else
                           dispatch(authenticated(user.uid, user.emailVerified, false));
                   })
                   .catch(err => console.log(err.message));
           }
            else
                dispatch(unauthenticated());
        });
    }
};

export const loginStarted = () => {
    return {
        type: actionTypes.LOGINSTARTED
    }
};

export const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGINSUCCESS,
        userInfo
    }
};

export const loginFailed = (error) => {
  return {
      type: actionTypes.LOGINFAILED,
      error
  }
};

export const login = (event, email, password) => {
    return dispatch => {
        event.preventDefault();
        dispatch(loginStarted());
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(userInfo => {
                addUsersLoggedIn(email);
                dispatch(loginSuccess(userInfo.user.uid));
            })
            .catch(error => {
                dispatch(loginFailed(error));
            });
    }
};

export const signUpStarted = () => {
    return {
        type: actionTypes.SIGNUPSTARTED
    }
};

export const signUpSuccess = (userInfo) => {
    return {
        type: actionTypes.SIGNUPSUCCESS,
        userInfo
    }
};

export const signUpFailed = (error) => {
    return {
        type: actionTypes.SIGNUPFAILED,
        error
    }
};

export const signUp = (event, email, password, username, mobileNumber) => {
    return dispatch => {
        event.preventDefault();
        dispatch(signUpStarted());
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then(userInfo => {
                addUsersLoggedIn(email);
                fire.database().ref('usersData/' + userInfo.user.uid).set({
                    displayName: username,
                    email,
                    emailVerified: false,
                    phoneNumber: mobileNumber,
                    photoURL: 'https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png',
                    accountCreated: new Date().toDateString(),
                    metaData: 'User description goes in here...'
                }).then(() => {});
                dispatch(signUpSuccess(userInfo.user.uid));
            })
            .catch(error => {
                dispatch(signUpFailed(error));
            });
    }
};

export const resetPassword = () => {
    return {
        type: actionTypes.RESETPASSWORD
    }
};

export const resetPasswordSuccess = () => {
    return {
        type: actionTypes.RESETPASSWORDSUCCESS
    }
};

export const resetPasswordFailed = (error) => {
    return {
        type: actionTypes.RESETPASSWORDFAILED,
        error
    }
};

export const startResetPassword = (event, emailAddress) => {
    return dispatch => {
        event.preventDefault();
        dispatch(resetPassword());
        fire.auth().sendPasswordResetEmail(emailAddress)
            .then(() => {
                dispatch(resetPasswordSuccess());
            })
            .catch(error => {
                dispatch(resetPasswordFailed(error));
            });
    };
};

export const resetErrors = () => {
    return {
        type: actionTypes.RESETERRORS
    }
};