import { delay } from 'redux-saga'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import { path } from 'ramda'
import InitActions from '../Redux/InitRedux'

import { Alert } from 'react-native'

const RCTFH = require('rct-fh');

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

// Saga to init FH SDK
export function * init (action) {
  try {
    const result = yield call(RCTFH.init);

    if (result === 'SUCCESS') {
      console.log('👍 init OK');
      yield put(InitActions.initSuccess());
    } else {
      console.log('👎 init KO');
      yield put(InitActions.initFailure(result));
    }
  } catch (e) {
    _log('About to yield failure (exception) ' + e + ' at ' + JSON.stringify(new Date()));
    console.log('👎 init KO');
    yield put(InitActions.initFailure(e));
  }
}