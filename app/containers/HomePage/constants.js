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

export const OPEN_SIDENAV = 'app/GangSideNav/OPEN_SIDENAV';
export const SET_GANG_FILTER = 'app/GangSideNav/SET_GANG_FILTER';
export const ADD_PROJECTS = 'app/Tabs/ADD_PROJECT';
export const CLOSE_TAB = 'app/Tabs/CLOSE_TAB';
export const CHANGE_TAB = 'app/Tabs/CHANGE_TAB';
export const GET_EMPDATA = 'app/EmpTable/GET_EMPDATA';
export const SET_EMPDATA = 'app/EmpTable/SET_EMPDATA';
export const EDIT_EMPDATA = 'app/EmpTable/EDIT_EMPDATA';
