/**
 * Gets the projects list from backend
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_PROJECTS } from './constants';
import { setSuccess, setFailed } from './actions';

export function* getProjectsList() {
  const url = `http://localhost:3000/api/Projects`;
  try {
    const output = yield call(request, url);
    yield put(setSuccess(output));
  } catch (e) {
    yield put(setFailed(e));
  }
}

export default function* projectDialogSaga() {
  yield takeLatest(GET_PROJECTS, getProjectsList);
}
