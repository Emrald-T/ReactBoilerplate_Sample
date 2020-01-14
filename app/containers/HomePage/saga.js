/**
 * Gets the repositories of the user from Github
 */
/* eslint-disable no-plusplus */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectProjectData, makeSelectAllEmpData } from './selectors';
import { GET_EMPDATA } from './constants';
import { setEmployeeData } from './actions';

export function* getEmployeeData() {
  // Select project data from store
  const projData = yield select(makeSelectProjectData());
  let key;
  //
  for (let i = projData.length - 1; i >= 0; i--) {
    key = projData[i].tabName;
    // Fetch data only for tabs which were never opened
    const empData = yield select(makeSelectAllEmpData());
    if (!empData[key].length) {
      // const requestURL = `https://api.github.com/users/${key}/repos?type=all&sort=updated`;
      const requestURL = `http://localhost:3000/api/EmployeeData/${key}`;

      try {
        // Call our request helper (see 'utils/request')
        const output = yield call(request, requestURL);
        const { results } = output;
        results.key = key;
        yield put(setEmployeeData(results));
      } catch (err) {
        // yield put(repoLoadingError(err));
        throw Error(err);
        // yield put(setEmployeeData(results));
        // console.log(err.message);
      }
    }
  }
}

// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_EMPDATA, getEmployeeData);
}
