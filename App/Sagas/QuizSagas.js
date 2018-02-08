import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DebugConfig from '../Config/DebugConfig'
import FixtureAPI from '../Services/FixtureApi'

import { NavigationActions } from 'react-navigation'

import QuizActions from '../Redux/QuizRedux'


const RCTFH = require('rct-fh');

// exported to make available for tests
export const generateLogData = (state) => state

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

export function * startQuiz (action) {
  const { quiz } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'startQuiz',
        value: {
          action,
          quiz
        }
      })
   }

   yield put(NavigationActions.navigate({ routeName: 'QuizScreen' }));
}

export function * stopQuiz (action) {
  const { quiz } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'stopQuiz',
        value: {
          action,
          quiz
        }
      })
   }

   yield put(NavigationActions.navigate({ routeName: 'RankingScreen' }));
}

export function * submitAnswers (action) {
  const { username, answers } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'submitResults',
        value: {
          action,
          username, answers
        }
      });
   }

   try {
    var options = {
        "path": "/answers/",
        "method": "POST",
        "contentType": "application/json",
        "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
        "data": {username, answers}
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.submitAnswers) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(QuizActions.fetchQuizSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(QuizActions.fetchQuizFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(QuizActions.fetchQuizFailure(e));
  }
}
