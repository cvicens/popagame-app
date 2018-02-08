import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

function _log(message) {
   if (__DEV__ && console.tron) {
    console.tron.log(message);
  }
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchEventRequest: ['country', 'city'],
  fetchEventSuccess: ['result'],
  fetchEventFailure: ['errorMessage'],
  toggleModalQuiz: null
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  result: null,
  currentEvent: null,
  currentQuiz: null,
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
  const { country, city } = action;
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
  return state.merge({ 
    fetching: false,
    result,
    currentEvent,
    currentQuiz,
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
    selectedEvent: null,
    showModal: null,
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
  [Types.TOGGLE_MODAL_QUIZ]: toggleModal
})
