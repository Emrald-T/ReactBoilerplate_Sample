/*
 *
 * Home reducer
 *
 */
/* eslint-disable no-plusplus */
import produce from 'immer';
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

export const initialState = {
  isTabOpen: false,
  projects: [],
  projectData: [],
  empData: {},
  loading: false,
  currentTab: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_SIDENAV:
        draft.isTabOpen = !state.isTabOpen;
        break;
      case SET_GANG_FILTER:
        draft.currentGang = action.gang;
        draft.isTabOpen = false;
        break;
      case ADD_PROJECTS: {
        const ids = action.data.id;
        const projects = [...state.projects];
        const projectData = [...state.projectData];
        let i;
        // Pushing newly added projects
        for (i = ids.length - 1; i >= 0; i--) {
          if (state.projects.indexOf(ids[i]) === -1) {
            projects.push(ids[i]);
            projectData.push(action.data.data[i]);
            draft.empData[ids[i]] = [];
          }
        }
        // Removing the unselected projects
        for (i = projects.length - 1; i >= 0; i--) {
          if (ids.indexOf(projects[i]) === -1) {
            projects.splice(ids[i]);
            projectData.splice(action.data.data[i]);
          }
        }
        draft.projects = action.data.id;
        draft.projectData = action.data.data;
        break;
      }
      case CLOSE_TAB: {
        const index = state.projects.indexOf(action.key);
        if (index !== -1) {
          draft.projects.splice(index, 1);
          draft.projectData.splice(index, 1);
        }
        break;
      }
      case CHANGE_TAB:
        if (action.key) {
          draft.currentTab = action.key;
        } else {
          const { projects } = draft;
          draft.currentTab = projects[projects.length - 1];
        }
        break;
      case GET_EMPDATA:
        draft.loading = true;
        break;
      case SET_EMPDATA: {
        const { data } = action;
        const { key } = data;
        // Setting some default values
        for (let i = data.length - 1; i >= 0; i--) {
          data[i].OldSt = data[i].St;
          data[i].OldOt = data[i].Ot;
          data[i].OldDt = data[i].Dt;
          data[i].invalidSt = false;
          data[i].invalidOt = false;
          data[i].invalidDt = false;
          data[i].initData = true;
        }
        draft.loading = false;
        draft.empData[key] = data;
        break;
      }
      case EDIT_EMPDATA: {
        const { data } = action;
        // if (
        //   data.OldSt === data.St &&
        //   data.OldOt === data.Ot &&
        //   data.OldDt === data.Dt
        // ) {
        //   data.initData = true;
        // } else {
        //   data.initData = false;
        // }
        draft.empData[action.key] = data;
        break;
      }
    }
  });

export default homeReducer;
