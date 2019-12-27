/*
 *
 * EmployeeTable reducer
 *
 */
import produce from 'immer';
import { DEFAULT } from './constants';

export const initialState = {
  empData: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const employeeTableReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT:
        break;
    }
  });

export default employeeTableReducer;
