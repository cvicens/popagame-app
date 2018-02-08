import _log from '../Services/Logger'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startQuiz: ['quiz'],
  pushAnswer: ['questionIdx', 'answer'],
  submitAnswersRequest: ['username', 'answers'],
  submitAnswersSuccess: ['result'],
  submitAnswersFailure: ['errorMessage'],
  toggleModal: null
})

export const QuizTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  result: null,
  startTimestamp: null,
  currentQuestionIdx: null,
  questions: null,
  answers: null,
  correctAnswers: 0,
  showModal: false,
  errorMessage: null,
  errorReason: null,
  errorDescription: null,
  errorRecoverySuggestion: null
})

/* ------------- Reducers ------------- */

// start quiz
export const startQuiz = (state, action) => {
  const { quiz } = action;
  _log('QuizRedux startQuiz ', 'quiz', [action, state]);
  return state.merge({
    startTimestamp: new Date().toISOString(),
    currentQuestionIdx: 0,
    questions: quiz.questions,
    answers: []
  });
}

// next question quiz
export const pushAnswer = (state, action) => {
  const { questionIdx, answer } = action;
  _log('QuizRedux', 'pushAnswer ' + questionIdx + ':' + answer, action);

  // If no timestamp, ignore
  if (!state.startTimestamp) {
    return state.merge({});
  }

  // TODO check multi-answer... for now just 1 correct answer
  if (answer === state.questions[questionIdx].answers[0]) {
    return state.merge({ 
      currentQuestionIdx: state.currentQuestionIdx++,
      correctAnswers: state.correctAnswers++,
      answers: [...state.answers, answer]
    });
  }
  return state.merge({ 
    currentQuestionIdx: state.currentQuestionIdx++,
    answers: [...state.answers, answer]
  });
}

// submit quiz answers request
export const request = (state, action) => {
  _log('At QuizRedux: request');
  const { answers } = action;
  _log('At QuizRedux: request action ' + action + ' state' + state);
  return state.merge({ 
    fetching: true, 
    result: null, 
    showModal: null, 
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null });
}

// success to fetch events
export const success = (state, action) => {
  const { result } = action;
  _log('At QuizRedux: success action ' + action + ' state' + state);
  return state.merge({ 
    fetching: false,
    result,
    showModal: false,
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null })
}

// failed to fetch events
export const failure = (state, action) => {
  const { errorMessage } = action;
  _log('At QuizRedux: failure action ' + action + ' state' + state);
  const errorReason = errorMessage.userInfo.NSLocalizedFailureReason;
  const errorDescription = errorMessage.userInfo.NSLocalizedDescription;
  const errorRecoverySuggestion = errorMessage.userInfo.NSLocalizedRecoverySuggestion;
  return state.merge({ 
    fetching: false, error: true, 
    contry: null,
    city: null,
    result: null,
    selectedEvent: null,
    showModal: null,
    errorMessage, errorDescription, errorReason, errorRecoverySuggestion });
}

// toggle Modal
export const toggleModal = (state, action) => {
  _log('At LoginRedux: toggleModal action ' + action + ' state' + state);
  return state.merge({ showModal: !state.showModal });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_QUIZ]: startQuiz,
  [Types.PUSH_ANSWER]: pushAnswer,
  [Types.SUBMIT_ANSWERS_REQUEST]: request,
  [Types.SUBMIT_ANSWERS_SUCCESS]: success,
  [Types.SUBMIT_ANSWERS_FAILURE]: failure,
  [Types.TOGGLE_MODAL]: toggleModal
})
