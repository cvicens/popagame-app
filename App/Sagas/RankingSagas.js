import _log from '../Services/Logger'
import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DebugConfig from '../Config/DebugConfig'
import FixtureAPI from '../Services/FixtureApi'

import { NavigationActions } from 'react-navigation'

import RankingActions from '../Redux/RankingRedux'

const RCTFH = require('rct-fh');

// exported to make available for tests
export const generateLogData = (state) => state


export function * fetchRanking (action) {
  const { eventId } = action

  _log('🔥 RankingSagas 🔥', 'fetchRanking id: ' + eventId, [action]);

   try {
    var options = {
        "path": "/ranking/" + eventId,
        "method": "GET",
        "contentType": "application/json",
        "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.fetchRanking, eventId) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(RankingActions.fetchRankingSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(RankingActions.fetchRankingFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(RankingActions.fetchRankingFailure(e));
  }
}
