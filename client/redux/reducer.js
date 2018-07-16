import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS } from './constants';

const initialState = {
  campuses: [],
  selectedCampus: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, campuses: action.campuses};

    default:
      return state;
  }
};
