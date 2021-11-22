import "./_resultList.scss";
import React from "react";
import arrowGreen from "../../assets/images/arrow_green.png";
import arrowRed from "../../assets/images/arrow_red.png";

const ResultList = props => {
  const { matches } = props;
  const matchList = [...matches];
  const matchResults = matchList.filter(match => match.matchOver === true);
  const reducedResults = matchResults.slice(0, 30);

  return (
    <div>
      {reducedResults.map(m => (
        <div className={(m.teams.blue.score - m.teams.red.score === 10) || (m.teams.red.score - m.teams.blue.score === 10) ? "c_resultList-row yellow-bgr" : "c_resultList-row"}>
          <div className="c_resultList-adjustment-blue">
            {m.teams.blue.adjustment % 1 != 0
              ? m.teams.blue.adjustment.toFixed()
              : m.teams.blue.adjustment}
            <img src={m.teams.blue.adjustment > 0 ? arrowGreen : arrowRed} />
          </div>

          <div className="c_resultList-team-blue">
            <p>
              {m.teams.blue.players[0].username} &{" "}
              {m.teams.blue.players[1].username}{" "}
            </p>
          </div>

          <div className="c_resultList-score">
            <h1>
              {m.teams.blue.score} {" - "} {m.teams.red.score}
            </h1>
          </div>

          <div className="c_resultList-team-red">
            <p>
              {m.teams.red.players[0].username} &{" "}
              {m.teams.red.players[1].username}{" "}
            </p>
          </div>
          <div className="c_resultList-adjustment-red">
            <img src={m.teams.red.adjustment > 0 ? arrowGreen : arrowRed} />
            {m.teams.red.adjustment % 1 != 0
              ? m.teams.red.adjustment.toFixed()
              : m.teams.red.adjustment}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
