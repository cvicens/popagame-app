import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'

import { NavigationActions } from 'react-navigation'

import LoginActions from '../Redux/LoginRedux'

const RCTFH = require('rct-fh');

const AUTH_POLICY = 'PopaGame';

// exported to make available for tests
export const generateLogData = (state) => state

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

export function * authenticate (action) {
  const { username, password } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 LoginSagas 🔥',
        preview: 'authenticate',
        value: {
          action,
          username, password
        }
      });
   }

  try {
    const result = yield call(RCTFH.auth, AUTH_POLICY, username, password);
    _log('fetch result', result);

    //if (result && typeof result.sessionToken !== 'undefined') {
    if (result) {
      _log('about to yield success')
      yield put(NavigationActions.navigate({ routeName: 'EventScreen' }))
      yield put(LoginActions.authenticateSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(LoginActions.authenticateFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(LoginActions.authenticateFailure(e));
  }
}
