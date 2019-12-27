import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activityDialog state domain
 */

const selectHomeState = state => state.home;
const selectActivityDialogDomain = state =>
  state.activityDialog || initialState;

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

export default selectActivityDialogDomain;
export { makeSelectProjects, makeSelectProjectData };
