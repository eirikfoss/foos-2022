import * as types from "./prevMatch-action";

const initialState = {
  prevMatches: [],
  match: {
    _id: "",
    location: "",
    teams: {
      blue: { players: [], score: "" },
      red: { players: [], score: "" }
    }
  },
  isLoading: false,
  prevMatchId: "",
  error: ""
};

export const prevMatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PREV_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case types.FETCH_PREV_MATCHES_SUCCESS:
      return { ...state, isLoading: false, prevMatches: action.payload };
    case types.FETCH_PREV_MATCHES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.ADD_PREV_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case types.ADD_PREV_MATCHES_SUCCESS:
      return { ...state, isLoading: false, prevMatchId: action.payload._id };
    case types.ADD_PREV_MATCHES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.REMOVE_PREV_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case types.REMOVE_PREV_MATCH_SUCCESS:
      return {
        ...state,
        prevMatches: state.prevMatches.filter(
          match => match.id !== action.payload
        ),
        isLoading: false
      };
    case types.REMOVE_PREV_MATCH_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
