import axios from 'axios';
import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS, ADD_CAMPUS_FORM } from './constants';

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

export function addCampusForm (campusEntry) {
  return {
    type: ADD_CAMPUS_FORM,
    campusEntry
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

export function fetchOneCampus (campusId) {
  return async function (dispatch) {
    const res = await axios.get(`/api/campuses/${campusId}`);
    const foundCampus = res.data;
    console.log(foundCampus)
    dispatch(selectCampus(foundCampus));
  }
}
