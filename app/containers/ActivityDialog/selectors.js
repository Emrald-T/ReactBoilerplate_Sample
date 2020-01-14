import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activityDialog state domain
 */

const selectActState = state => state.projectsDialog || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ActivityDialog
 */

const getSlctdProjects = () =>
  createSelector(
    selectActState,
    state => state.slctdProjects,
  );

const getSlctdProjectData = () =>
  createSelector(
    selectActState,
    state => state.slctdProjectData,
  );

const getProjectData = () =>
  createSelector(
    selectActState,
    state => state.projectData,
  );

const getRequestCompleted = () =>
  createSelector(
    selectActState,
    state => state.fetchComplete,
  );

const getProjectTree = () =>
  createSelector(
    selectActState,
    state => ({
      success: state.fetchSuccess,
      message: state.message,
      tree: state.projectTree,
    }),
  );

export {
  getSlctdProjects,
  getSlctdProjectData,
  getProjectTree,
  getProjectData,
  getRequestCompleted,
};
