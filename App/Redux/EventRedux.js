import _log from '../Services/Logger'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchEventRequest: ['country', 'city', 'username'],
  fetchEventSuccess: ['result'],
  fetchEventFailure: ['errorMessage'],
  fetchQuizStatusRequest: ['eventId', 'username'],
  fetchQuizStatusSuccess: ['result'],
  fetchQuizStatusFailure: ['errorMessage'],
  toggleModalQuiz: null
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  result: null,
  quizStatus: null,
  currentEvent: null,
  currentQuiz: null,
  currentQuizStatus: null,
  country: null,
  city: null,
  showModal: false,
  errorMessage: null,
  errorReason: null,
  errorDescription: null,
  errorRecoverySuggestion: null
})

/* ------------- Reducers ------------- */

// fetch event request
export const request = (state, action) => {
  _log('At EventRedux: request');
  const { country, city, username } = action;
  _log('At EventRedux: request action ' + action + ' state' + state);
  return state.merge({ 
    fetching: true, 
    result: [], 
    showModal: null, 
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null });
}

// success to fetch events
export const success = (state, action) => {
  const { result } = action;
  _log('At EventRedux: success action ' + action + ' state' + state);
  const currentEvent = result.data.length >= 0 ? result.data[0] : null;
  const currentQuiz = currentEvent != null ? currentEvent.quiz : null;
  let currentQuizStatus = null;
  if (result.status.length >= 0) {
    const aux = result.status.filter((status) => status && status.eventId === currentEvent.id);
    currentQuizStatus = aux.length > 0 ? aux[0].newStatus : null;
  }
  return state.merge({ 
    fetching: false,
    result,
    currentEvent,
    currentQuiz,
    currentQuizStatus,
    showModal: false,
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null })
}

// failed to fetch events
export const failure = (state, action) => {
  const { errorMessage } = action;
  _log('At EventRedux: failure action ' + action + ' state' + state);
  const errorReason = errorMessage.userInfo.NSLocalizedFailureReason;
  const errorDescription = errorMessage.userInfo.NSLocalizedDescription;
  const errorRecoverySuggestion = errorMessage.userInfo.NSLocalizedRecoverySuggestion;
  return state.merge({ 
    fetching: false, error: true, 
    contry: null,
    city: null,
    result: null,
    currentEvent: null,
    currentQuiz: null,
    currentQuizStatus: null,
    selectedEvent: null,
    showModal: null,
    errorMessage, errorDescription, errorReason, errorRecoverySuggestion });
}

// fetch quiz status request
export const fetchQuizStatusRequest = (state, action) => {
  _log('At EventRedux: fetchQuizStatusRequest');
  const { eventId, username } = action;
  _log('At EventRedux: request action ' + action + ' state' + state);
  return state.merge({ 
    fetching: true, 
    quizStatus: null, 
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null });
}

// success to fetch quiz status
export const fetchQuizStatusSuccess = (state, action) => {
  const { result } = action;
  _log('At EventRedux: fetchQuizStatusSuccess action ' + action + ' state' + state);
  const quizStatus = result.data && result.data.newStatus ? result.data.newStatus : null;
  return state.merge({ 
    fetching: false,
    quizStatus,
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null })
}

// failed to fetch quiz status
export const fetchQuizStatusFailure = (state, action) => {
  const { errorMessage } = action;
  _log('At EventRedux: failure action ' + action + ' state' + state);
  const errorReason = errorMessage.userInfo.NSLocalizedFailureReason;
  const errorDescription = errorMessage.userInfo.NSLocalizedDescription;
  const errorRecoverySuggestion = errorMessage.userInfo.NSLocalizedRecoverySuggestion;
  return state.merge({ 
    fetching: false, error: true, 
    quizStatus: null,
    errorMessage, errorDescription, errorReason, errorRecoverySuggestion });
}

// toggle Modal
export const toggleModal = (state, action) => {
  _log('At EventRedux: toggleModal action ' + action + ' state' + state);
  return state.merge({ showModal: !state.showModal });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_EVENT_REQUEST]: request,
  [Types.FETCH_EVENT_SUCCESS]: success,
  [Types.FETCH_EVENT_FAILURE]: failure,
  [Types.FETCH_QUIZ_STATUS_REQUEST]: fetchQuizStatusRequest,
  [Types.FETCH_QUIZ_STATUS_SUCCESS]: fetchQuizStatusSuccess,
  [Types.FETCH_QUIZ_STATUS_FAILURE]: fetchQuizStatusFailure,
  [Types.TOGGLE_MODAL_QUIZ]: toggleModal
})
