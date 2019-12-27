import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tabPanel state domain
 */

const selectTabPanelDomain = state => state.tabPanel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TabPanel
 */

const makeSelectTabPanel = () =>
  createSelector(
    selectTabPanelDomain,
    substate => substate,
  );

export default makeSelectTabPanel;
export { selectTabPanelDomain };
