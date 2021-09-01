import {SET_COURSE, SET_COURSES, SET_CURRENT_LECTURE} from '../types';

const initialState = {
  course: {},
  courses: [],
  currentLecture: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSE:
      return {...state, course: action.payload};
    case SET_COURSES:
      return {...state, courses: action.payload};
    case SET_CURRENT_LECTURE:
      return {...state, currentLecture: action.payload};
    default:
      return state;
  }
};
