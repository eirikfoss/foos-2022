import React from "react";
import "./_editMatches.scss";
import {  useDispatch } from "react-redux";
import {removeMatch}from "../../redux/matches/match-action";

const EditMatches = props => {
  const { matches } = props;
  const dispatch = useDispatch();

  let sortedMatches = [...matches];

  if (sortedMatches.length > 0) {
    sortedMatches = sortedMatches.sort((b, a) =>
      b.createdAt > a.createdAt ? -1 : 1
    );
  }

  const removeItem = (id) => {
    console.log(id);
    const isConfirmed = window.confirm(`Delete match?`);
    if (!isConfirmed) return;
    dispatch(removeMatch(id));
  }

  return (
    <ul className="c_editMatches-container">
      {sortedMatches.map(m => (
        <li key={m._id}>
          <div className="c_editMatches-match">
            <div>{m.location}</div>
            <div className="c_editMatches-team-blue">
              {m.teams.blue.players[0].username} &{" "}
              {m.teams.blue.players[1].username}
            </div>
            <input className="c_editMatches-input" value={m.teams.blue.score} />
            
            <input className="c_editMatches-input" value={m.teams.red.score} />
            <div className="c_editMatches-team-red">
              {m.teams.red.players[0].username} &{" "}
              {m.teams.red.players[1].username}
            </div>
            
            <button onClick={() => removeItem(m._id)} className="c_editMatches-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EditMatches;
