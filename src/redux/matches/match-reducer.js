import * as types from "./match-action";

const initialState = {
  matches: [],
  match: false,
  matchOver: false,
  isLoading: false,
  dataLoaded: false,
  matchReady: false,
  error: ""
};

export const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCHES_REQUEST:
      return { ...state, isLoading: true, dataLoaded: false };
    case types.FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
        dataLoaded: true
      };
    case types.FETCH_MATCHES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dataLoaded: false
      };
    case types.FETCH_MATCH_BY_LOCATION_REQUEST:
      return { ...state, isLoading: true, dataLoaded: false };
    case types.FETCH_MATCH_BY_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataLoaded: true,
        match: action.payload
      };
    case types.FETCH_MATCH_BY_LOCATION_FAIL:
      return {
        ...state,
        isLoading: false,
        dataLoaded: false,
        error: action.payload
      };
    case types.CREATE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.CREATE_MATCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matchOver: false,
        match: action.payload
      };
    case types.CREATE_MATCH_FAIL:
      return { ...state, isLoading: false };
    case types.UPDATE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.UPDATE_MATCH_SUCCESS:
      return { ...state, isLoading: false, match: action.payload };
    case types.UPDATE_MATCH_FAIL:
      return { ...state, isLoading: false };
    case types.REMOVE_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.REMOVE_MATCH_SUCCESS:
      return {
        ...state,
        matches: state.matches.filter(m => m._id !== action.payload),
        matchOver: true,
        match: false,
        isLoading: false
      };
    case types.REMOVE_MATCH_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.SET_MATCH_TO_FALSE_REQUEST:
      return { ...state };
    case types.SET_MATCH_TO_FALSE_SUCCESS:
      return { ...state, match: false };
    case types.SET_MATCH_TO_FALSE_FAIL:
      return { ...state };
    case types.GAME_OVER_REQUEST:
      return { ...state };
    case types.GAME_OVER_SUCCESS:
      return { ...state, matchOver: true };
    case types.GAME_OVER_FAIL:
      return { ...state };
    case types.REMOVE_ACTIVE_MATCH:
      return { ...state, match: false };
    default:
      return state;
  }
};
