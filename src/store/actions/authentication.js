import fire from '../../config/fire';
import * as actionTypes from './actionTypes';

const addUsersLoggedIn = (email) => {
    fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
        email
    }).then(() => {}).catch(() => {});
};

const removeUsersLoggedIn = () => {
    fire.database().ref('usersLoggedIn/' + fire.auth().currentUser.uid).set({
        email: null
    }).then(() => {}).catch(() => {});
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
    return dispatch => {
        fire.auth().signOut()
            .then(() => {
                removeUsersLoggedIn();
                dispatch(logoutSuccess());
            })
            .catch(error => {console.log(error.message)});
    }
};

export const authenticated = (userId, isVerified) => {
    return {
        type: actionTypes.AUTHENTICATED,
        userId,
        isVerified
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
           if (user)
               dispatch(authenticated(user.uid, user.emailVerified));
            else
                dispatch(unauthenticated());
        });
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
        console.log('Email = ', email, '\n Password = ', password);
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(userInfo => {
                addUsersLoggedIn(email);
                dispatch(loginSuccess(userInfo).user.uid);
            })
            .catch(error => {
                dispatch(loginFailed(error));
            });
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

export const signUp = (event, email, password) => {
    return dispatch => {
        event.preventDefault();
        const accountCreated = new Date().toString();
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then(userInfo => {
                addUsersLoggedIn(email);
                fire.database().ref('usersData/' + fire.auth().currentUser.uid).set({
                    displayName: '',
                    email,
                    emailVerified: false,
                    phoneNumber: '',
                    photoURL: 'https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png',
                    accountCreated,
                    metaData: 'User\'s description goes in here...'
                }).then(() => {}).catch(() => {});
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

export const startResetPassword = (emailAddress) => {
    return dispatch => {
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