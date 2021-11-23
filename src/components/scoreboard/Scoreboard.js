import React from "react";
import "./_scoreboard.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMatch,
  removeActiveMatch,
  gameOver
} from "../../redux/matches/match-action";
import {
  updatePlayer,
  fetchPlayers
} from "./../../redux/players/player-action";
import calculateAdjustment from "../../services/calculateRatingAdjustment";
import playScoreSound from "../../services/scoreSound";

const Scoreboard = () => {
  let { match, matchOver, matches } = useSelector(state => state.matchReducer);

  const dispatch = useDispatch();

  function onKeyDown(e) {
    let newMatchData = { ...match };
    console.log(e.key);

    if (!newMatchData.matchOver) {
      switch (e.key) {
        case "ArrowUp":
          newMatchData.teams.blue.score++;
          break;
        case "ArrowDown":
          newMatchData.teams.blue.score > 0
            ? newMatchData.teams.blue.score--
            : (newMatchData.teams.blue.score = 0);
          break;
        case "ArrowLeft":
          newMatchData.teams.red.score > 0
            ? newMatchData.teams.red.score--
            : (newMatchData.teams.red.score = 0);
          break;
        case "ArrowRight":
          newMatchData.teams.red.score++;
          break;
        default:
      }
      handleScoreAdjustment(newMatchData);
    }
  }

  const teamRedClicked = () => {
    let newMatchData = { ...match };

    if (!newMatchData.matchOver) {
      
        let diff =
          calculateTeamRating(match.teams.red) -
          calculateTeamRating(match.teams.blue);
        newMatchData.teams.red.score++;
        playScoreSound(newMatchData.teams.red.score, diff);
      
      handleScoreAdjustment(newMatchData);
    }
  }

  const teamBlueClicked = () => {
    let newMatchData = { ...match };
    console.log("Blue clicked!");

    if (!newMatchData.matchOver) {
      
      let diff =
          calculateTeamRating(match.teams.blue) -
          calculateTeamRating(match.teams.red);
        newMatchData.teams.blue.score++;
        playScoreSound(newMatchData.teams.blue.score, diff);
    
    handleScoreAdjustment(newMatchData);
     }
  }

  function onKeyPressed(e) {
    let newMatchData = { ...match };

    if (!newMatchData.matchOver) {
      if (e.type === "contextmenu") {
        let diff =
          calculateTeamRating(match.teams.blue) -
          calculateTeamRating(match.teams.red);
        newMatchData.teams.blue.score++;
        playScoreSound(newMatchData.teams.blue.score, diff);
      } else if (e.type === "click") {
        let diff =
          calculateTeamRating(match.teams.red) -
          calculateTeamRating(match.teams.blue);
        newMatchData.teams.red.score++;
        playScoreSound(newMatchData.teams.red.score, diff);
      }
      handleScoreAdjustment(newMatchData);
    }
  }

  const handleScoreAdjustment = newMatchData => {
    if (match.teams.blue.score === 10) {
      let ratingDiff =
        calculateTeamRating(match.teams.red) -
        calculateTeamRating(match.teams.blue);
      let scoreDiff = match.teams.blue.score - match.teams.red.score;
      let adjustment = calculateAdjustment(ratingDiff, scoreDiff);

      newMatchData.teams.blue.adjustment = +adjustment;
      newMatchData.teams.red.adjustment = -adjustment;
      newMatchData.matchOver = true;

      sendPlayers(newMatchData);
      console.log("Updating player db");
    } else if (match.teams.red.score === 10) {
      let ratingDiff =
        calculateTeamRating(match.teams.blue) -
        calculateTeamRating(match.teams.red);
      let scoreDiff = match.teams.red.score - match.teams.blue.score;
      let adjustment = calculateAdjustment(ratingDiff, scoreDiff);

      newMatchData.teams.red.adjustment = +adjustment;
      newMatchData.teams.blue.adjustment = -adjustment;
      newMatchData.matchOver = true;

      sendPlayers(newMatchData);
      console.log("Updating player db");
    }

    if (!matchOver) {
      dispatch(updateMatch(newMatchData));
      if (newMatchData.matchOver) {
        dispatch(gameOver());
      }
    }
  };

  const calculateTeamRating = team => {
    const p1Stats = team.players[0].stats;
    const p2Stats = team.players[1].stats;
    const rating = (p1Stats.rating + p2Stats.rating) / 2;
    return rating;
  };

  const sendPlayers = matchData => {
    const blueTeam = matchData.teams.blue;
    const redTeam = matchData.teams.red;

    for (let i = 0; i < 2; i++) {
      let bPlayer = blueTeam.players[i];
      let rPlayer = redTeam.players[i];

      bPlayer.stats = calculatePlayerStats(bPlayer, matchData);
      rPlayer.stats = calculatePlayerStats(rPlayer, matchData);

      bPlayer.stats = calculatePlayerStats(bPlayer, "blue", matchData);
      rPlayer.stats = calculatePlayerStats(rPlayer, "red", matchData);

      dispatch(updatePlayer(blueTeam.players[i]));
      dispatch(updatePlayer(redTeam.players[i]));
    }

  };

  const calculatePlayerStats = (player, team, matchData) => {
    let mDifference = 0;
    let stats = {};

    if (matchData) {
      mDifference = matchData.teams.blue.score - matchData.teams.red.score;
    }

    stats.rating = player.stats.rating ? player.stats.rating : 1500;
    stats.wins = player.stats.wins ? player.stats.wins : 0;
    stats.loss = player.stats.loss ? player.stats.loss : 0;
    stats.difference = player.stats.difference ? player.stats.difference : 0;
    stats.screensFor = player.stats.screensFor ? player.stats.screensFor : 0;
    stats.screensAgainst = player.stats.screensAgainst ? player.stats.screensAgainst : 0;
    stats.streak = player.stats.streak ? player.stats.streak : 0;
    stats.bestStreak = player.stats.bestStreak ? player.stats.bestStreak : 0;



    switch (team) {
      case "blue":
        stats.rating += matchData.teams.blue.adjustment;
        stats.wins = matchData.teams.blue.score === 10 ? stats.wins + 1 : stats.wins;
        stats.loss = matchData.teams.blue.score < 10 ? stats.loss + 1 : stats.loss;
        stats.difference += mDifference;
        stats.screensFor = mDifference === 10 ? stats.screensFor + 1 : stats.screensFor;
        stats.screensAgainst = mDifference === -10 ? stats.screensAgainst + 1 : stats.screensAgainst;
        stats.streak = mDifference > 0 ? stats.streak + 1 : 0;
        stats.bestStreak = stats.streak > stats.bestStreak ? stats.streak : stats.bestStreak;
        break;
      case "red":
        stats.rating += matchData.teams.red.adjustment;
        stats.wins = matchData.teams.red.score === 10 ? stats.wins + 1 : stats.wins;
        stats.loss = matchData.teams.red.score < 10 ? stats.loss + 1 : stats.loss;
        stats.difference += -mDifference;
        stats.screensFor = mDifference === -10 ? stats.screensFor + 1 : stats.screensFor;
        stats.screensAgainst = mDifference === 10 ? stats.screensAgainst + 1 : stats.screensAgainst;
        stats.streak = mDifference < 0 ? stats.streak + 1 : 0;
        stats.bestStreak = stats.streak > stats.bestStreak ? stats.streak : stats.bestStreak;
        break;
      default:
    }
    console.log(matchData);
    return stats;
  }

  const renderNewMatchOptions = () => {
    return (
      <div className="d-flex justify-content-center">
        <button
          onClick={startNewGame}
          type="button"
          className="btn btn-primary c_button"
        >
          <p>New Match</p>
        </button>
      </div>
    );
  };

  const startNewGame = () => {
    dispatch(removeActiveMatch());
    dispatch(fetchPlayers());
  };

  const rematch = () => {
    //create a redux handler for rematch
    dispatch(removeActiveMatch());
  };

  const winScreen = () => {
    let players;
    if (match.teams.blue.score === 10) {
      players = match.teams.blue.players;
    } else {
      players = match.teams.red.players;
    }


    return (
      <>
        <div className="winScreen-win-text">
          {match.teams.blue.score === 10 ? "Blue Team Wins!" : "Red Team Wins!"}
        </div>
        <div className="winScreen"></div>

        <div className="winner-card-container winner-card-container-one">
          <div className="w_flip-card w_flip-card-one">
            <div className="w_flip-card-inner w_flip-card-inner-one">
              <div className="w_flip-card-front">
                <div className="w_flip-card-back-title">
                  <h1>{players[0].username}</h1>
                </div>
                <div className="w_flip-card-back-container">
                  <div className="w_flip-card-mainStats-container">
                    <div id="mainStats-rating">
                      <p>Rating</p>
                      <h2>{players[0].stats.rating.toFixed()}</h2>
                    </div>
                    <div id="vertical-divider"></div>
                    <div id="mainStats-winP">
                      <p>Winrate</p>
                      <h2>{(players[0].stats.wins / (players[0].stats.wins + players[0].stats.loss) * 100).toFixed() + "%"}</h2>
                    </div>
                  </div>
                  <div className="w_horizontal-divider"></div>
                  <div className="w_flip-card-back-secondaryStats-container">
                    <p>
                      Wins: <strong>{players[0].stats.wins}</strong>
                    </p>
                    <p>
                      Loss: <strong>{players[0].stats.loss}</strong>
                    </p>
                    <p>
                      Games Played:{" "}
                      <strong>{players[0].stats.gamesPlayed}</strong>
                    </p>
                  </div>
                  <div className="w_horizontal-divider"></div>
                  <div className="w_flip-card-back-streak-container">
                    <p>Dayum, son!</p>
                    <p>
                      Streak: <strong>{players[0].stats.streak}</strong>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w_flip-card-back">
                <div className="w_flip-card-img-container">
                  <img
                    id="ioidfufuso898476"
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
                    }
                    alt="..."
                  />
                </div>

                <div className="w_flip-card-mainStats-container">
                  <div id="mainStats-rating">
                    <p>Rating</p>
                    <h2>{players[0].stats.rating.toFixed()}</h2>
                  </div>
                  <div id="vertical-divider"></div>
                  <div id="mainStats-winP">
                    <p>Winrate</p>
                    <h2>{(players[0].stats.wins / (players[0].stats.wins + players[0].stats.loss) * 100).toFixed() + "%"}</h2>
                  </div>
                </div>

                <div className="w_front-name">
                  <h1>{players[0].username}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="winner-card-container winner-card-container-two">
          <div className="w_flip-card w_flip-card-two">
            <div className="w_flip-card-inner w_flip-card-inner-two">
              <div className="w_flip-card-front">
                <div className="w_flip-card-back-title">
                  <h1>{players[1].stats.username}</h1>
                </div>
                <div className="w_flip-card-back-container">
                  <div className="w_flip-card-mainStats-container">
                    <div id="mainStats-rating">
                      <p>Rating</p>
                      <h2>{players[1].stats.rating.toFixed()}</h2>
                    </div>
                    <div id="vertical-divider"></div>
                    <div id="mainStats-winP">
                      <p>Winrate</p>
                      <h2>{(players[1].stats.wins / (players[1].stats.wins + players[1].stats.loss) * 100).toFixed() + "%"}</h2>
                    </div>
                  </div>
                  <div className="w_horizontal-divider"></div>
                  <div className="w_flip-card-back-secondaryStats-container">
                    <p>
                      Wins: <strong>{players[1].stats.wins}</strong>
                    </p>
                    <p>
                      Loss: <strong>{players[1].stats.loss}</strong>
                    </p>
                    <p>
                      Games Played: <strong>{players[1].gamesPlayed}</strong>
                    </p>
                  </div>
                  <div className="w_horizontal-divider"></div>
                  <div className="w_flip-card-back-streak-container">
                    <p>Dayum, son!</p>
                    <p>
                      Streak: <strong>{players[1].stats.streak}</strong>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w_flip-card-back">
                <div className="w_flip-card-img-container">
                  <img
                    id="ioidfufuso898476"
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
                    }
                    alt="..."
                  />
                </div>

                <div className="w_flip-card-mainStats-container">
                  <div id="mainStats-rating">
                    <p>Rating</p>
                    <h2>{players[1].stats.rating.toFixed()}</h2>
                  </div>
                  <div id="vertical-divider"></div>
                  <div id="mainStats-winP">
                    <p>Winrate</p>
                    <h2>{(players[1].stats.wins / (players[1].stats.wins + players[1].stats.loss) * 100).toFixed() + "%"}</h2>
                  </div>
                </div>

                <div className="w_front-name">
                  <h1>{players[1].username}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="winner-rating-adjustment">
          {"+ "}
          {match.teams.blue.score === 10
            ? match.teams.blue.adjustment
            : match.teams.red.adjustment}
        </div>
        <button
          className="new-game-button"
          onClick={startNewGame}
          type="button"
        >
          New Game
        </button>
      </>
    );
  };

  return (
    <div>
    <div
      className="p_fill"
      id="target"
      onClick={e => onKeyPressed(e)}
      onKeyDown={e => onKeyDown(e)}
      onContextMenu={e => {
        e.preventDefault();
        onKeyPressed(e);
      }}
      tabIndex="1"
    >
    </div> 
      <div
        className={"c_scoreboard-container "}
        id={match.matchOver === true && "blur-container"}
      >
        <div className="c_scoreboard-team-container">
          <div 
          className="c_scoreboard-team"
          onClick={e => teamRedClicked(e)}
          >
            <div className="c_scoreboard-team-color-red"></div>
            <h2>{calculateTeamRating(match.teams.red).toFixed()}</h2>
            <h1>{match.teams.red.players[0].username}</h1>
            <h1>{match.teams.red.players[1].username}</h1>
            

          </div>

          <div className="c_scoreboard-team" onClick={e => teamBlueClicked(e)}>
            <div
            className="c_scoreboard-team-color-blue"
            
            ></div>
            <h2 align="right">{calculateTeamRating(match.teams.blue).toFixed()}</h2>
            <h1>{match.teams.blue.players[0].username}</h1>
            <h1>{match.teams.blue.players[1].username}</h1>
            
          </div>

        </div>
        
        <div className="c_scoreboard-score">
          <h1>{match.teams.red.score + " - " + match.teams.blue.score}</h1>
        </div>
        
      </div>

      {match && match.matchOver && winScreen()}
    
    </div>
  );
};

export default Scoreboard;
