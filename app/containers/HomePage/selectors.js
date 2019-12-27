import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeTable state domain
 */
// const homeState = state => state.home;
const homeState = state => state.home || initialState;

/**
 * Other specific selectors
 */

const makeSelectEmpData = () =>
  createSelector(
    homeState,
    state => state.empData[state.currentTab] || [],
  );

const makeSelectAllEmpData = () =>
  createSelector(
    homeState,
    state => state.empData || [],
  );

const makeSelectProjects = () =>
  createSelector(
    homeState,
    state => state.projects || [],
  );

const makeSelectProjectData = () =>
  createSelector(
    homeState,
    state => state.projectData || [],
  );

const makeSelectCurrentTab = () =>
  createSelector(
    homeState,
    state => {
      if (!state.currentTab) {
        return state.projects[state.projects.length - 1];
      }
      return state.currentTab;
    },
  );

export {
  makeSelectEmpData,
  makeSelectAllEmpData,
  makeSelectProjects,
  makeSelectProjectData,
  makeSelectCurrentTab,
};
