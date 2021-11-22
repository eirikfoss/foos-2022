import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectPlayers from "./../selectPlayers/SelectPlayers";
import { fetchMatchByLocation, fetchMatches } from "../../redux/matches/match-action";
import { fetchPrevMatches } from "../../redux/prevMatches/prevMatch-action";
import { fetchPlayers, fetchPlayerImages } from "../../redux/players/player-action";
import Scoreboard from "../scoreboard/Scoreboard";

export default function MatchController({ location }) {
  const dispatch = useDispatch();


  let { match, matches } = useSelector(state => state.matchReducer);

  useEffect(() => {
    dispatch(fetchMatchByLocation(location));
    dispatch(fetchMatches());
    dispatch(fetchPrevMatches());
    dispatch(fetchPlayers());

  }, []);



  return <>{match ? <Scoreboard /> : <SelectPlayers location={location} matches={matches} />}</>;
}
