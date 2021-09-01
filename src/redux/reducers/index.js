import {combineReducers} from 'redux';

import AppStateReducer from './AppStateReducer';
import UserReducer from './UserReducer';
import CourseReducer from './CourseReducer';

const rootReducer = combineReducers({
  appState: AppStateReducer,
  user: UserReducer,
  course: CourseReducer,
});

export default rootReducer;
