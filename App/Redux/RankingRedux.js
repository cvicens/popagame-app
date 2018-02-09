import _log from '../Services/Logger'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchRankingRequest: ['eventId'],
  fetchRankingSuccess: ['result'],
  fetchRankingFailure: ['errorMessage']
})

export const RankingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  rows: null,
  errorMessage: null,
  errorReason: null,
  errorDescription: null,
  errorRecoverySuggestion: null
})

/* ------------- Reducers ------------- */

// fetch ranking request
export const request = (state, action) => {
  const { eventId } = action;
  _log('RankingRedux request ranking ', 'eventId: ' + eventId, [action, state]);
  return state.merge({ 
    fetching: true, 
    result: null, 
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null });
}

// success to fetch events
export const success = (state, action) => {
  const { result } = action;
  _log('RankingRedux success ranking ', 'eventId: ' + result.ok, [action, state]);
  return state.merge({ 
    fetching: false,
    rows: result.data,
    errorMessage: null, errorDescription: null, errorReason: null, errorRecoverySuggestion: null })
}

// failed to fetch events
export const failure = (state, action) => {
  const { errorMessage } = action;
  _log('RankingRedux failure ranking ', 'error', [action, state]);
  const errorReason = errorMessage.userInfo.NSLocalizedFailureReason;
  const errorDescription = errorMessage.userInfo.NSLocalizedDescription;
  const errorRecoverySuggestion = errorMessage.userInfo.NSLocalizedRecoverySuggestion;
  return state.merge({ 
    fetching: false, error: true, 
    errorMessage, errorDescription, errorReason, errorRecoverySuggestion });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_RANKING_REQUEST]: request,
  [Types.FETCH_RANKING_SUCCESS]: success,
  [Types.FETCH_RANKING_FAILURE]: failure
})
