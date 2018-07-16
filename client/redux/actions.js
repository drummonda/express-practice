import axios from 'axios';
import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS } from './constants';

// ACTION CREATORS

export function setCampuses (campuses) {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}

export function selectCampus (campus) {
  return {
    type: SELECT_CAMPUS,
    campus
  }
}

export function addCampus (campus) {
  return {
    type: ADD_CAMPUS,
    campus,
  }
}

// THUNK CREATORS

export function fetchCampuses () {
  return async function (dispatch) {
    const res = await axios.get('/api/campuses');
    const campuses = res.data;
    dispatch(setCampuses(campuses));
  }
}

export function postCampus (campus) {
  return async function (dispatch) {
    const res = await axios.post('/api/campuses', campus);
    const newCampus = res.data;
    dispatch(addCampus(newCampus));
  }
}
