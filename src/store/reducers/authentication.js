import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userId: null,
  isAuthenticated: false,
  isVerified: false,
    willVerify: false,
    willReset: false,
    errorLogin: null,
    errorSignup: null,
    errorPasswordReset: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATED:
            return {
                ...state,
                userId: action.userId,
                isAuthenticated: true,
                isVerified: action.isVerified
            };
        case actionTypes.UNAUTHENTICATED:
            return state;
        case actionTypes.LOGINSUCCESS:
            return {
                ...state,
                userId: action.userInfo,
                errorLogin: null
            };
        case actionTypes.LOGINFAILED:
            return {
                ...state,
                errorLogin: action.error
            };
        case actionTypes.SIGNUPSUCCESS:
            return {
                ...state,
                userId: action.userInfo,
                errorSignup: null
            };
        case actionTypes.SIGNUPFAILED:
            return {
                ...state,
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
                willReset: true
            };
        case actionTypes.RESETPASSWORDSUCCESS:
            return {
                ...state,
                willReset: false
            };
        case actionTypes.RESETPASSWORDFAILED:
            return {
                ...state,
                willReset: false,
                errorPasswordReset: action.error
            };
        default:
            return state;
    }
};

export default reducer;