import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import "./_home.scss";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches } from "../../redux/matches/match-action";
import { fetchPlayers, sortPlayersBy } from "../../redux/players/player-action";
import PlayerCard from "../../components/playerCard/PlayerCard";
import LiveMatches from "../../components/liveMatches/LiveMatches";
import ResultList from "../../components/resultList/ResultList";
import calculateRatingAdjustment from "../../services/calculateRatingAdjustment";

const Home = () => {
  const dispatch = useDispatch();

  const { matches } = useSelector(state => state.matchReducer);

  const { players, departments, sortBy } = useSelector(
    state => state.playerReducer
  );

  let sortedMatches = [...matches];

  let playerList = [...players];
  sortBy === "All"
    ? (playerList = playerList)
    : (playerList = playerList.filter(player => player.department === sortBy));

  if (sortedMatches.length > 0) {
    sortedMatches = sortedMatches.sort((b, a) =>
      b.createdAt > a.createdAt ? -1 : 1
    );
  }

  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchPlayers());

    const socket = openSocket("http://foos.ddns.net:4001");

    socket.on("updateMatches", () => {
      dispatch(fetchMatches());
    });
    socket.on("updatePlayers", () => {
      dispatch(fetchPlayers());
    });
  }, []);

  const renderPlayers = () => {
    let playersByWin = [...playerList];
    playersByWin = playersByWin.sort((a, b) =>
      a.stats.rating > b.stats.rating ? -1 : 1
    );

    return (
      <ul>
        {playersByWin.map(p => (
          <li key={p._id}>
            <PlayerCard player={p} matches={matches} />
          </li>
        ))}
      </ul>
    );
  };

  const filterDepartment = dep => {
    console.log(calculateRatingAdjustment(-51));
    dispatch(sortPlayersBy(dep));
    console.log(dep);
  };

  const renderTabs = () => {
    return (
      <div className="c_playerList-tabs">
        <button
          key="All"
          className="tablinks"
          id="tab-All"
          onClick={() => {
            filterDepartment("All");
          }}
        >
          All
        </button>
        {departments.map(dep => (
          <button
            key={dep}
            className="tablinks"
            onClick={() => {
              filterDepartment(dep);
            }}
          >
            {dep}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="background-dark">
      <div className="row c_home-container ">
        <div className="col">
          <Container>
            {matches && (
              <div>
                <LiveMatches matches={matches} />
                <div className="live-matches-header">Scoreboard</div>
                <ResultList matches={sortedMatches} />
              </div>
            )}
          </Container>
        </div>
        <div className="col c_playerList">
          {renderTabs()}
          {renderPlayers()}
        </div>
      </div>
    </div>
  );
};

export default Home;
