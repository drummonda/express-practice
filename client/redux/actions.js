import axios from 'axios';
import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS } from './constants';

// ACTION CREATORS

export function setCampuses (campuses) {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}

export function selectCampus () {
  //you code here
}

export function addCampus () {
  //your code here
}

// THUNK CREATORS

export function fetchCampuses () {
  //your code here
}

export function postCampus () {
  //your code here
}
