import React, { useState, useEffect } from "react";
import "./_playerCard.scss";
import getMyStats from "../../services/getPlayerStats";

import { useSelector, useDispatch } from "react-redux";

import getplayerImages from "../../services/getPlayerImg";

const PlayerCard = props => {
  const { player, matches } = props;
  const [image, setImage] = useState("");

  let { isloading } = useSelector(state => state.playerReducer);
  let myStats = getMyStats(player, matches);

  const setPlayerImg = async () => {
    let safeName = player.username
      .replace("ø", "%C3%B5")
      .replace("å", "%C3%A5")
      .replace("æ", "%C3%A6")
      .replace("Ø", "%C3%98")
      .replace("Å", "%C3%85")
      .replace("Æ", "%C3%86");
    let response = await getplayerImages(safeName);

    let img = document.createElement("img");
    img = window.URL.createObjectURL(response.fileBlob);
    setImage(img);
  };

  const onStreakText = streak => {
    let text = "";

    if (streak === 0) {
      text = text = "Not winning, ey?";
    } else if (streak > 0 && streak <= 2) {
      text = "Humble beginnings";
    } else if (streak > 2 && streak <= 4) {
      text = "On a roll!";
    } else if (streak > 4 && streak <= 7) {
      text = "Getting hot!";
    } else if (streak > 7 && streak <= 9) {
      text = "Win Win Win!";
    } else if (streak > 9 && streak <= 12) {
      text = "You are on FIRE!!!";
    } else if (streak > 9 && streak <= 12) {
      text = "SIIIICK";
    }
    return text;
  };

  useEffect(() => {
    //setImage(getPlayerImg(player.username));
    setPlayerImg();
  }, []);

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flip-card-img-container">
            <img
              id={player._id}
              src={
                image
                  ? image
                  : "https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
              }
              alt="..."
            />
          </div>

          <div className="flip-card-mainStats-container">
            <div id="mainStats-rating">
              <p>Rating</p>
              <h2>{player.stats.rating.toFixed()}</h2>
            </div>
            <div id="vertical-divider"></div>
            <div id="mainStats-winP">
              <p>Winrate</p>
              <h2>{(player.stats.wins / (player.stats.wins + player.stats.loss) * 100).toFixed()}%</h2>
            </div>
          </div>

          <div className="front-name">
            <h1>{player.username}</h1>
          </div>
          {player.stats.streak >= 10 && (
            <div className="smallFire">
              <div className="smallParticle"></div>
              <div className="smallParticle"></div>
              <div className="smallParticle"></div>
            </div>
          )}
        </div>

        <div className="flip-card-back">
          <div className="flip-card-back-title">
            <h1>{player.username}</h1>
          </div>
          <div className="flip-card-back-container">
            <div className="flip-card-mainStats-back-container">
              <div id="mainStats-rating">
                <p>Rating</p>
                <h2>{player.stats.rating.toFixed()}</h2>
              </div>
              <div id="vertical-divider"></div>
              <div id="mainStats-winP">
                <p>Winrate</p>
                <h2>{(player.stats.wins / (player.stats.wins + player.stats.loss) * 100).toFixed()}%</h2>
              </div>
            </div>
            <div className="horizontal-divider"></div>
            <div className="flip-card-back-secondaryStats-container">
              <p>
                Wins: <strong>{player.stats.wins}</strong>
              </p>
              <p>
                Loss: <strong>{player.stats.loss}</strong>
              </p>
              <p>
                Games Played: <strong>{player.stats.wins + player.stats.loss}</strong>
              </p>
              <p>
                Difference: <strong>{player.stats.difference}</strong>
              </p>
              <p>
          Screens: <strong>{player.stats.screensFor}</strong> - <strong>{player.stats.screensAgainst}</strong>
              </p>
            </div>
            <div className="horizontal-divider"></div>
            <div className="flip-card-back-streak-container">
              <p>{onStreakText(player.stats.streak)}</p>
              <p>
                Streak: <strong>{player.stats.streak}</strong>{" "} Best: <strong>{player.stats.bestStreak}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      {player.stats.streak >= 10 && (
        <div className="fire">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
