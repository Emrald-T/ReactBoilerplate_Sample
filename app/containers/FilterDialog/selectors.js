import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the filterDialog state domain
 */

const selectFilterDialogDomain = state => state.filterDialog || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FilterDialog
 */

const makeSelectFilterDialog = () =>
  createSelector(
    selectFilterDialogDomain,
    substate => substate,
  );

export default makeSelectFilterDialog;
export { selectFilterDialogDomain };
