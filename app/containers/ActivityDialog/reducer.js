/*
 *
 * Home reducer
 *
 */
/* eslint-disable no-plusplus */
import produce from 'immer';
import {
  GET_PROJECTS,
  SEARCH_PROJECTS,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from './constants';

export const initialState = {
  slctdProjects: [],
  slctdProjectData: [],
  projectTree: [],
  projectData: {},
  fetchComplete: false,
  fetchSuccess: false,
  searchValue: '',
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROJECTS:
        draft.fetchComplete = false;
        draft.fetchSuccess = false;
        draft.searchValue = '';
        draft.message = '';
        break;
      case SEARCH_PROJECTS: {
        draft.searchValue = action.value;
        break;
      }
      case FETCH_SUCCESS:
        draft.fetchComplete = true;
        draft.fetchSuccess = true;
        draft.projectTree = action.projects.tree;
        draft.projectData = action.projects.list;
        break;
      case FETCH_FAIL:
        draft.fetchComplete = true;
        draft.fetchSuccess = false;
        draft.message = action.message;
        break;
    }
  });

export default homeReducer;
