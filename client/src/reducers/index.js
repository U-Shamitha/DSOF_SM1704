import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from './currentUser';
import questionsReducer from "./questions";
import usersReducer from "./users";
import typeReducer from "./payment";

import stateReducer from './state_sm';

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer, typeReducer, stateReducer
})