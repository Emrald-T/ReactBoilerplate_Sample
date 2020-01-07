import { createSelector } from 'reselect';

/**
 * Direct selector to the activityDialog state domain
 */

const selectHomeState = state => state.home;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ActivityDialog
 */

const makeSelectProjects = () =>
  createSelector(
    selectHomeState,
    homeState => (homeState ? homeState.projects : []),
  );

const makeSelectProjectData = () =>
  createSelector(
    selectHomeState,
    homeState => (homeState ? homeState.projectData : []),
  );

export { makeSelectProjects, makeSelectProjectData };
