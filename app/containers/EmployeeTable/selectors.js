import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeTable state domain
 */
// const homeState = state => state.home;
const selectEmployeeTableDomain = state => state.employeeTable || initialState;
const homeState = state => state.home;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeeTable
 */

const makeSelectEmployeeTable = () =>
  createSelector(
    selectEmployeeTableDomain,
    substate => substate,
  );

const makeSelectEmpData = () =>
  createSelector(
    homeState,
    state => state.empData[state.currentTab] || [],
  );

export default makeSelectEmployeeTable;
export { makeSelectEmpData };
