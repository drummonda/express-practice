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

export function addCampus () {
  //your code here
}

// THUNK CREATORS

export function fetchCampuses () {
  return async function (dispatch) {
    const res = await axios.get('/api/campuses');
    const campuses = res.data;
    dispatch(setCampuses(campuses));
  }
}

export function postCampus () {
  //your code here
}
