/*
 *
 * Home actions
 *
 */

import {
  GET_PROJECTS,
  SEARCH_PROJECTS,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from './constants';

export function getProjects() {
  return {
    type: GET_PROJECTS,
  };
}

export function setSuccess(projects) {
  return {
    type: FETCH_SUCCESS,
    projects,
  };
}

export function setFailed(message) {
  return {
    type: FETCH_FAIL,
    message,
  };
}

export function searchProjects(value) {
  return {
    type: SEARCH_PROJECTS,
    value,
  };
}
