import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DebugConfig from '../Config/DebugConfig'
import FixtureAPI from '../Services/FixtureApi'

import EventActions from '../Redux/EventRedux'

const RCTFH = require('rct-fh');

// exported to make available for tests
export const generateLogData = (state) => state

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

export function * fetchEvent (action) {
  const { country, city } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 EventSagas 🔥',
        preview: 'fetchEvent',
        value: {
          action,
          country, city
        }
      });
   }

   try {
    var options = {
        "path": "/events/" + country.toUpperCase() + "/" + city.toUpperCase(),
        "method": "GET",
        "contentType": "application/json",
        "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.fetchEvent) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(EventActions.fetchEventSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(EventActions.fetchEventFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(EventActions.fetchEventFailure(e));
  }
}
