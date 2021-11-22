import {
  getPlayers,
  deletePlayer,
  updPlayer,
  createPlayer
} from "./player-service";

import getAllPlayerImages from "../../services/getAllPlayerImages";

/* action types */
export const FETCH_PLAYERS_REQUEST = "FETCH_PLAYERS_REQUEST";
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_PLAYERS_FAIL = "FETCH_PLAYERS_FAIL";

export const FETCH_PLAYER_IMAGES_REQUEST = "FETCH_PLAYER_IMAGES_REQUEST";
export const FETCH_PLAYER_IMAGES_SUCCESS = "FETCH_PLAYER_IMAGES_SUCCESS";
export const FETCH_PLAYER_IMAGES_FAIL = "FETCH_PLAYER_IMAGES_FAIL";

export const ADD_PLAYER_REQUEST = "ADD_PLAYER_REQUEST";
export const ADD_PLAYER_SUCCESS = "ADD_PLAYER_SUCCESS";
export const ADD_PLAYER_FAIL = "ADD_PLAYER_FAIL";

export const REMOVE_PLAYER_REQUEST = "REMOVE_PLAYER_REQUEST";
export const REMOVE_PLAYER_SUCCESS = "REMOVE_PLAYER_SUCCESS";
export const REMOVE_PLAYER_FAIL = "REMOVE_PLAYER_FAIL";

export const UPDATE_PLAYER_REQUEST = "UPDATE_PLAYER_REQUEST";
export const UPDATE_PLAYER_SUCCESS = "UPDATE_PLAYER_SUCCESS";
export const UPDATE_PLAYER_FAIL = "UPDATE_PLAYER_FAIL";

export const HANDLE_CHOSEN_REQUEST = "HANDLE_CHOSEN_REQUEST";
export const HANDLE_CHOSEN_SUCCESS = "HANDLE_CHOSEN_SUCCESS";
export const HANDLE_CHOSEN_FAIL = "HANDLE_CHOSEN_FAIL";

export const SET_PLAYER = "SET_PLAYER";

export const SET_CHOSEN_PLAYERS = "SET_CHOSEN_PLAYERS";

export const SET_SHUFFLING = "SET_SHUFFLING";

export const SET_SORT_PLAYERS_BY = "SET_SORT_PLAYERS_BY";

/* action creators: thunk version */
export const fetchPlayers = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PLAYERS_REQUEST
    });
    try {
      const { data } = await getPlayers();
      dispatch({ type: FETCH_PLAYERS_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_PLAYERS_FAIL,
        payload: e.message
      });
    }
  };
};

export const addPlayer = player => {
  return async dispatch => {
    dispatch({
      type: ADD_PLAYER_REQUEST
    });
    try {
      const { data } = await createPlayer(player);

      dispatch({ type: ADD_PLAYER_SUCCESS, payload: data });
      console.log(data);
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: ADD_PLAYER_FAIL,
        payload: e.message
      });
    }
  };
};

export const handleChosenPlayer = (pList, cList) => {
  return dispatch => {
    dispatch({
      type: HANDLE_CHOSEN_REQUEST
    });
    try {
      const data = { pList, cList };
      dispatch({ type: HANDLE_CHOSEN_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: HANDLE_CHOSEN_FAIL,
        payload: e.message
      });
    }
  };
};

export const updatePlayer = player => {
  return async dispatch => {
    dispatch({
      type: UPDATE_PLAYER_REQUEST
    });
    try {
      const { data } = await updPlayer(player);
      dispatch({ type: UPDATE_PLAYER_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: UPDATE_PLAYER_FAIL,
        payload: e.message
      });
    }
  };
};

export const removePlayer = id => {
  return async dispatch => {
    dispatch({
      type: REMOVE_PLAYER_REQUEST
    });
    try {
      await deletePlayer(id);
      dispatch({ type: REMOVE_PLAYER_SUCCESS, payload: id });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: REMOVE_PLAYER_FAIL,
        payload: e.message
      });
    }
  };
};

export const fetchPlayerImages = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PLAYER_IMAGES_REQUEST
    });
    try {
      const { data } = await getAllPlayerImages();
      dispatch({ type: FETCH_PLAYER_IMAGES_SUCCESS, payload: data });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      dispatch({
        type: FETCH_PLAYER_IMAGES_FAIL,
        payload: e.message
      });
    }
  };
};

export const setPlayer = player => ({
  type: SET_PLAYER,
  payload: player
});

export const setChosenPlayers = chosenList => ({
  type: SET_CHOSEN_PLAYERS,
  payload: chosenList
});

export const shuffling = () => ({
  type: SET_SHUFFLING
});

export const sortPlayersBy = sortBy => ({
  type: SET_SORT_PLAYERS_BY,
  payload: sortBy
});
