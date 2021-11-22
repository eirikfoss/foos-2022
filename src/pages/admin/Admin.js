import React, { useEffect } from "react";
import "./_admin.scss";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches } from "../../redux/matches/match-action";
import { fetchPrevMatches } from "../../redux/prevMatches/prevMatch-action";
import { fetchPlayers } from "../../redux/players/player-action";
import PlayerCard from "../../components/playerCard/PlayerCard";
import RenderPrevMatches from "../../components/prevMatches/prevMatches";
import PlayerAdmin from "../../components/playerAdmin/PlayerAdmin";
import EditMatches from "../../components/editMatches/EditMatches";

const Admin = () => {
  const dispatch = useDispatch();
  const { matches } = useSelector(state => state.matchReducer);
  const { players } = useSelector(state => state.playerReducer);

  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchPlayers());
  }, []);

  const renderPlayers = () => {
    let playersByWin = [...players];
    playersByWin = playersByWin.sort((a, b) =>
      a.stats.wins > b.stats.wins ? -1 : 1
    );

    return (
      <ul>
        {playersByWin.map(p => (
          <li key={p._id}>
            <PlayerCard player={p} />
          </li>
        ))}
      </ul>
    );
  };
  /*

  <div className="winner-card-container winner-card-container-two">
          <div className="winner-card winner-card-two"></div>
        </div>

  */

  return (
    <div className="">
      <div className="row">
        <div className="col">
          <h1>Matches</h1>

          <EditMatches matches={matches} />
        </div>
        <div className="col">
          <PlayerAdmin />
        </div>
      </div>
    </div>
  );
};

export default Admin;
