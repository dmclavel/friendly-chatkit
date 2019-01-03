import authReducer from './authentication';
import profileReducer from './userProfile';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    profileInfo: profileReducer
});

export default rootReducer;