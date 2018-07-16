import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS, ADD_CAMPUS_FORM } from './constants';

const initialState = {
  campuses: [],
  selectedCampus: {},
  campusEntry: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, campuses: action.campuses};

    case SELECT_CAMPUS:
      return {...state, selectedCampus: action.campus};

    case ADD_CAMPUS:
      return {...state, campuses: [...state.campuses, action.campus]};

    case ADD_CAMPUS_FORM:
      return {...state, campusEntry: action.campusEntry}

    default:
      return state;
  }
};
