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
  const { quiz, eventId, username } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'startQuiz',
        value: {
          action
        }
      })
   }
   const status = 'START';
   yield put(QuizActions.submitQuizStatusRequest(eventId, username, status));
   try {
    var options = {
        "path": "/quizzes/status/" +  eventId + "/" + username,
        "method": "POST",
        "contentType": "application/json",
        "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
        "data": { status }
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.submitQuizStatus) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(QuizActions.submitQuizStatusSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(QuizActions.submitQuizStatusFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(QuizActions.submitQuizStatusFailure(e));
  }

  yield put(NavigationActions.navigate({ routeName: 'QuizScreen' }));
}

export function * stopQuiz (action) {
  const { eventId, username } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'stopQuiz',
        value: {
          action
        }
      })
   }
   const status = 'STOP';
   yield put(QuizActions.submitQuizStatusRequest(eventId, username, status));
   try {
    var options = {
        "path": "/quizzes/status/" +  eventId + "/" + username,
        "method": "POST",
        "contentType": "application/json",
        "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
        "data": { status }
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.submitQuizStatus) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(QuizActions.submitQuizStatusSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(QuizActions.submitQuizStatusFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(QuizActions.submitQuizStatusFailure(e));
  }

  yield put(NavigationActions.navigate({ routeName: 'RankingScreen' }));
}

export function * submitAnswer (action) {
  const { username, userId, firstName, lastName, eventId, questionIdx, answer } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'submitAnswer',
        value: {
          action,
          username, eventId, questionIdx, answer
        }
      });
   }

   yield put(QuizActions.submitAnswerRequest(username, eventId, questionIdx, answer));
   try {
    var options = {
        "path": "/answers/",
        "method": "POST",
        "contentType": "application/json",
        "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
        "data": {username, userId, firstName, lastName, eventId, questionIdx, answer, points: 10}
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.submitAnswers) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(QuizActions.submitAnswerSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(QuizActions.submitAnswerFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(QuizActions.submitAnswerFailure(e));
  }
}

export function * submitAnswers (action) {
  const { username, eventId, answers } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 QuizSagas 🔥',
        preview: 'submitAnswers',
        value: {
          action,
          username, answers
        }
      });
   }

   try {
    var options = {
        "path": "/answers/bulk",
        "method": "POST",
        "contentType": "application/json",
        "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
        "data": {username, eventId, answers}
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
