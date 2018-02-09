import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes }  from '../Redux/GithubRedux'

import { InitTypes }    from '../Redux/InitRedux'
import { LoginTypes }   from '../Redux/LoginRedux'
import { EventTypes }   from '../Redux/EventRedux'
import { QuizTypes }   from '../Redux/QuizRedux'
import { RankingTypes }   from '../Redux/RankingRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

import { init }    from './InitSagas'
import { authenticate }   from './LoginSagas'
import { fetchEvent }    from './EventSagas'
import { submitAnswers, startQuiz, stopQuiz }   from './QuizSagas'
import { fetchRanking }   from './RankingSagas'

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    
    takeLatest(InitTypes.INIT_REQUEST, init),
    
    takeLatest(LoginTypes.AUTHENTICATE_REQUEST, authenticate),
    
    takeLatest(EventTypes.FETCH_EVENT_REQUEST, fetchEvent),

    takeLatest(QuizTypes.SUBMIT_ANSWERS_REQUEST, submitAnswers),
    takeLatest(QuizTypes.START_QUIZ, startQuiz),
    takeLatest(QuizTypes.STOP_QUIZ, stopQuiz),

    takeLatest(RankingTypes.FETCH_RANKING_REQUEST, fetchRanking),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
