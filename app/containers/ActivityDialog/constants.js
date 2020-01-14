/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_PROJECTS = 'app/ActivityDialog/GET_PROJECTS';
export const FETCH_SUCCESS = 'app/ActivityDialog/FETCH_SUCCESS';
export const FETCH_FAIL = 'app/ActivityDialog/FETCH_FAIL';
export const SEARCH_PROJECTS = 'app/ActivityDialog/SEARCH_PROJECTS';
