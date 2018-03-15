import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import DebugConfig from '../Config/DebugConfig'
import FixtureAPI from '../Services/FixtureApi'

import EventActions from '../Redux/EventRedux'
import QuizActions from '../Redux/QuizRedux'

import { NavigationActions } from 'react-navigation'
import QuizScreen from '../Containers/QuizScreen';

const RCTFH = require('rct-fh');

// exported to make available for tests
export const generateLogData = (state) => state

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

export function * fetchEvent (action) {
  const { country, city, username } = action

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
        "path": "/events/" + country.toUpperCase() + "/" + city.toUpperCase() + '/' + username,
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

export function * fetchQuizStatus (action) {
  const { eventId, username } = action

   if (__DEV__ && console.tron) {
      console.tron.display({
      name: '🔥 EventSagas 🔥',
        preview: 'fetchEventStatus',
        value: {
          action
        }
      });
   }
   
   yield put(EventActions.fetchQuizStatusRequest(eventId, username));
   try {
    var options = {
        "path": "/quizzes/status/" + eventId + "/" + username,
        "method": "GET",
        "contentType": "application/json",
        "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
      }
    const result = DebugConfig.useFixtures ? yield call(FixtureApi.fetchQuizStatus) : yield call(RCTFH.cloud, options);
    _log('fetch result', result);

    if (result) {
      _log('about to yield success')
      yield put(EventActions.fetchQuizStatusSuccess(result));
    } else {
      _log('about to yield failure')
      yield put(EventActions.fetchQuizStatusFailure(result));
    }
  } catch (e) {
    _log('about to yield failure (exception)')
    yield put(EventActions.fetchQuizStatusFailure(e));
  }
}

export function * checkQuizStatus (action) {
  const { result } = action

  if (__DEV__ && console.tron) {
    console.tron.display({
    name: '🔥 EventSagas 🔥',
      preview: 'checkQuizStatus',
      value: {
        action
      }
    })
  }
  
  const currentEvent = result.data.length >= 0 ? result.data[0] : null;
  const currentQuiz = currentEvent != null ? currentEvent.quiz : null;
  let currentQuizStatus = null;
  if (result.status && result.status.length >= 0) {
    const aux = result.status.filter((status) => status && status.eventId === currentEvent.id);
    currentQuizStatus = aux.length > 0 ? aux[0].newStatus : null;
  }

  if (currentQuizStatus === 'STOP') {
    yield put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'RankingScreen' })]
    }));
  }
}