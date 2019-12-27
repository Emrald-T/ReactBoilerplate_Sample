import { createSelector } from 'reselect';
import { initialState } from '../Home/reducer';

/**
 * Direct selector to the gangSideNav state domain
 */

const selectGangSideNavDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GangSideNav
 */

const makeSelectTabOpen = () =>
  createSelector(
    selectGangSideNavDomain,
    substate => substate.isTabOpen,
  );

export { selectGangSideNavDomain, makeSelectTabOpen };
