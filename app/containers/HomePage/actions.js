/*
 *
 * Home actions
 *
 */

import {
  OPEN_SIDENAV,
  SET_GANG_FILTER,
  ADD_PROJECTS,
  CLOSE_TAB,
  CHANGE_TAB,
  GET_EMPDATA,
  SET_EMPDATA,
  EDIT_EMPDATA,
} from './constants';

export function openSideNav() {
  return {
    type: OPEN_SIDENAV,
  };
}

export function setGangFilter(gang) {
  return {
    type: SET_GANG_FILTER,
    gang,
  };
}

export function addProject(data) {
  return {
    type: ADD_PROJECTS,
    data,
  };
}

export function closeTab(key) {
  return {
    type: CLOSE_TAB,
    key,
  };
}

export function changeTab(key) {
  return {
    type: CHANGE_TAB,
    key,
  };
}

export function getEmployeeData() {
  return {
    type: GET_EMPDATA,
  };
}

export function setEmployeeData(data) {
  return {
    type: SET_EMPDATA,
    data,
  };
}

export function editEmployeeData(key, data) {
  return {
    type: EDIT_EMPDATA,
    key,
    data,
  };
}
