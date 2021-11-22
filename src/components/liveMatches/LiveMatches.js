import React from "react";
import { Container, Box } from "@material-ui/core";
import "./_liveMatches.scss";
import getPlayerStats from "../../services/getPlayerStats";
import redShirt from "../../assets/images/redShirt_large.png";
import blueShirt from "../../assets/images/blueShirt_large.png";

const renderLiveMatches = matches => {
  const liveMatches = matches.filter(match => match.matchOver !== true);

  const calculateTeamRating = team => {
    const p1Stats = team.players[0].stats;
    const p2Stats = team.players[1].stats;
    const rating = (p1Stats.rating + p2Stats.rating) / 2;
    return rating;
  };

  return (
    <ul>
      {liveMatches.map(m => (
        <li key={m._id}>
          <Container className="c_match-container">
            <Box className="c_player-box">
              <p>{m.teams.blue.players[0].username}</p>
              <p>{m.teams.blue.players[1].username}</p>
            </Box>

            <Box>
              <Box className="c_table-box">
                <h3 className="c_location-name">{m.location}</h3>
              </Box>

              <Box className="c_score-box">
                <Box className="c_team-box">
                  <img src={blueShirt} alt="red shirt" />
                  <h2>{calculateTeamRating(m.teams.blue).toFixed()}</h2>
                </Box>

                <h1>
                  {m.teams.blue.score} {" - "} {m.teams.red.score}
                </h1>

                <Box className="c_team-box">
                  <img src={redShirt} alt="blue shirt" />
                  <h2>{calculateTeamRating(m.teams.red).toFixed()}</h2>
                </Box>
              </Box>
            </Box>

            <Box className="c_player-box">
              <p>{m.teams.red.players[0].username}</p>
              <p>{m.teams.red.players[1].username}</p>
            </Box>
          </Container>
        </li>
      ))}
    </ul>
  );
};

/*

<Container className="c_container d-flex justify-content-center">
            <Box className="c_playerBox">
              {m.teams.blue.players[0].username} {" & "}
              {m.teams.blue.players[1].username}
            </Box>
            <Box className="c_scoreBox">
              {m.teams.blue.score} {" - "} {m.teams.red.score}
            </Box>
            <Box className="c_playerBox">
              {m.teams.red.players[0].username} {" & "}
              {m.teams.red.players[1].username}
            </Box>
          </Container> 

*/
const LiveMatches = props => {
  const { matches } = props;

  return <div>{renderLiveMatches(matches)}</div>;
};

export default LiveMatches;
