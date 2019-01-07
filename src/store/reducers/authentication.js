import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userId: null,
  isAuthenticated: false,
  isVerified: false,
    verificationReload: false,
    willLogin: false,
    willSignup: false,
    willVerify: false,
    willReset: false,
    errorLogin: null,
    errorSignup: null,
    errorPasswordReset: null,
    successReset: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATED:
            return {
                ...state,
                userId: action.userId,
                isAuthenticated: true,
                isVerified: action.isVerified,
                verificationReload: action.verificationReload
            };
        case actionTypes.UNAUTHENTICATED:
            return state;
        case actionTypes.LOGINSTARTED:
            return {
                ...state,
                willLogin: true,
                errorLogin: null
            };
        case actionTypes.LOGINSUCCESS:
            return {
                ...state,
                willLogin: false,
                userId: action.userInfo,
                errorLogin: null
            };
        case actionTypes.LOGINFAILED:
            return {
                ...state,
                willLogin: false,
                errorLogin: action.error
            };
        case actionTypes.SIGNUPSTARTED:
            return {
                ...state,
                willSignup: true,
                errorSignup: null
            };
        case actionTypes.SIGNUPSUCCESS:
            return {
                ...state,
                userId: action.userInfo,
                willSignup: false,
                errorSignup: null
            };
        case actionTypes.SIGNUPFAILED:
            return {
                ...state,
                willSignup: false,
                errorSignup: action.error
            };
        case actionTypes.LOGOUTSUCCESS:
            return {
                ...state,
                userId: null,
                isAuthenticated: false,
                isVerified: false,
                errorLogin: null,
                errorSignup: null
            };
        case actionTypes.TRYTOVERIFY:
            return {
                ...state,
                willVerify: true
            };
        case actionTypes.RESETPASSWORD:
            return {
                ...state,
                successReset: false,
                willReset: true,
                errorPasswordReset: null
            };
        case actionTypes.RESETPASSWORDSUCCESS:
            return {
                ...state,
                successReset: true,
                willReset: false,
                errorPasswordReset: null
            };
        case actionTypes.RESETPASSWORDFAILED:
            return {
                ...state,
                successReset: false,
                willReset: false,
                errorPasswordReset: action.error
            };
        case actionTypes.RESETERRORS:
            return {
                ...state,
                successReset: false,
                errorLogin: null,
                errorSignup: null,
                errorPasswordReset: null
            };
        default:
            return state;
    }
};

export default reducer;