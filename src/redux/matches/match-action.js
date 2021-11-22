import { getMatches, postMatch, deleteMatch, updMatch } from "./match-service";
import openSocket from "socket.io-client";

const socket = openSocket("http://foos.ddns.net:4001");

/* action types */
export const FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST";
export const FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS";
export const FETCH_MATCHES_FAIL = "FETCH_MATCHES_FAIL";

export const CREATE_MATCH_REQUEST = "CREATE_MATCH_REQUEST";
export const CREATE_MATCH_SUCCESS = "CREATE_MATCH_SUCCESS";
export const CREATE_MATCH_FAIL = "CREATE_MATCH_FAIL";

export const UPDATE_MATCH_REQUEST = "UPDATE_MATCH_REQUEST";
export const UPDATE_MATCH_SUCCESS = "UPDATE_MATCH_SUCCESS";
export const UPDATE_MATCH_FAIL = "UPDATE_MATCH_FAIL";

export const FETCH_MATCH_BY_LOCATION_REQUEST =
  "FETCH_MATCH_BY_LOCATION_REQUEST";
export const FETCH_MATCH_BY_LOCATION_SUCCESS =
  "FETCH_MATCH_BY_LOCATION_SUCCESS";
export const FETCH_MATCH_BY_LOCATION_FAIL = "FETCH_MATCH_BY_LOCATION_FAIL";

export const REMOVE_MATCH_REQUEST = "REMOVE_MATCH_REQUEST";
export const REMOVE_MATCH_SUCCESS = "REMOVE_MATCH_SUCCESS";
export const REMOVE_MATCH_FAIL = "REMOVE_MATCH_FAIL";

export const SET_MATCH_TO_FALSE_REQUEST = "SET_MATCH_TO_FALSE_REQUEST";
export const SET_MATCH_TO_FALSE_SUCCESS = "SET_MATCH_TO_FALSE_SUCCESS";
export const SET_MATCH_TO_FALSE_FAIL = "SET_MATCH_TO_FALSE_FAIL";

export const GAME_OVER_REQUEST = "GAME_OVER_REQUEST";
export const GAME_OVER_SUCCESS = "GAME_OVER_SUCCESS";
export const GAME_OVER_FAIL = "GAME_OVER_FAIL";

export const REMOVE_ACTIVE_MATCH = "REMOVE_ACTIVE_MATCH";

/* action creators: thunk version */
export const fetchMatches = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_MATCHES_REQUEST
    });
    try {
      const { data } = await getMatches();
      dispatch({ type: FETCH_MATCHES_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_MATCHES_FAIL,
        payload: e.message
      });
    }
  };
};

export const createMatch = matchData => {
  return async dispatch => {
    dispatch({
      type: CREATE_MATCH_REQUEST
    });
    try {
      const { data } = await postMatch(matchData);

      dispatch({ type: CREATE_MATCH_SUCCESS, payload: data });
      socket.emit("refreshMatches");
      socket.emit("refreshPlayers");
      
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: CREATE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};

export const updateMatch = matchData => {
  return async dispatch => {
    dispatch({
      type: UPDATE_MATCH_REQUEST
    });
    try {
      const { data } = await updMatch(matchData);

      dispatch({ type: UPDATE_MATCH_SUCCESS, payload: data });
      socket.emit("refreshMatches");
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: UPDATE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};

export const fetchMatchByLocation = location => {
  return async dispatch => {
    dispatch({
      type: FETCH_MATCH_BY_LOCATION_REQUEST
    });
    try {
      const { data } = await getMatches();

      const matchList = data.filter(match => {
        return match.location === location && match.matchOver === false;
      });

      const activeMatch = matchList.length > 0 ? matchList[0] : false;
      dispatch({ type: FETCH_MATCH_BY_LOCATION_SUCCESS, payload: activeMatch });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_MATCH_BY_LOCATION_FAIL,
        payload: e.message
      });
    }
  };
};

export const removeMatch = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_MATCH_REQUEST
    });
    try {
      await deleteMatch(id);
      dispatch({ type: REMOVE_MATCH_SUCCESS, payload: id });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: REMOVE_MATCH_FAIL,
        payload: e.message
      });
    }
  };
};

export const setMatchToFalse = () => {
  return dispatch => {
    dispatch({
      type: SET_MATCH_TO_FALSE_REQUEST
    });
    try {
      dispatch({ type: SET_MATCH_TO_FALSE_SUCCESS });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: SET_MATCH_TO_FALSE_FAIL,
        payload: e.message
      });
    }
  };
};

export const gameOver = () => {
  return dispatch => {
    dispatch({
      type: GAME_OVER_REQUEST
    });
    try {
      dispatch({ type: GAME_OVER_SUCCESS });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: GAME_OVER_FAIL,
        payload: e.message
      });
    }
  };
};

export const removeActiveMatch = () => ({
  type: REMOVE_ACTIVE_MATCH
});
