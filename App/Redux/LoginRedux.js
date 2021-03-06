import _log from '../Services/Logger'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authenticateRequest: ['username', 'password'],
  authenticateSuccess: ['result'],
  authenticateFailure: ['errorMessage'],
  updateUsername: ['username'],
  updatePassword: ['password'],
  toggleModalEvent: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  result: null,
  userId: null,
  firstName: null,
  lastName: null,
  givenName: null,
  username: null,
  password: null,
  showModal: false,
  errorMessage: null,
  errorReason: null,
  errorDescription: null,
  errorRecoverySuggestion: null
})

/* ------------- Reducers ------------- */

// update username
export const updateUsername = (state, action) => {
  //_log('At LoginRedux: updateUsername');
  const { username } = action;
  return state.merge({ username });
}

// update password
export const updatePassword = (state, action) => {
  //_log('At LoginRedux: updatePassword');
  const { password } = action;
  return state.merge({ password });
}

// authentication request
export const request = (state, action) => {
  const { username, password } = action;
  _log('LoginRedux', 'request ' + JSON.stringify(username));
  return state.merge({ 
    fetching: true, 
    result: [],
    userId: null,
    firstName: null, lastName: null, givenName: null,
    username, password, 
    error: false, errorMessage: null });
}

// success to authenticate
export const success = (state, action) => {
  _log('At LoginRedux: success');
  const { result } = action;
  const userId = result.userId;
  const firstName = result.firstName;
  const lastName = result.lastName;
  const givenName = result.givenName;
  return state.merge({ 
    fetching: false, error: false, 
    result,
    userId,
    firstName, lastName, givenName,
    showModal: true,
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null });
}

// failed to authenticate
export const failure = (state, action) => {
  _log('At LoginRedux: failure');
  const { errorMessage } = action;
  const errorReason = errorMessage.userInfo.NSLocalizedFailureReason;
  const errorDescription = errorMessage.userInfo.NSLocalizedDescription;
  const errorRecoverySuggestion = errorMessage.userInfo.NSLocalizedRecoverySuggestion;
  return state.merge({ 
    fetching: false, error: true, 
    result: null,
    userId: null,
    firstName: null, lastName: null, givenName: null,
    username: null, password: null,
    errorMessage, errorDescription, errorReason, errorRecoverySuggestion });
}

// toggle Modal
export const toggleModal = (state, action) => {
  _log('At LoginRedux: toggleModal action ' + action + ' state' + state);
  return state.merge({ showModal: !state.showModal });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTHENTICATE_REQUEST]: request,
  [Types.AUTHENTICATE_SUCCESS]: success,
  [Types.AUTHENTICATE_FAILURE]: failure,
  [Types.UPDATE_USERNAME]: updateUsername,
  [Types.UPDATE_PASSWORD]: updatePassword,
  [Types.TOGGLE_MODAL_EVENT]: toggleModal
})
