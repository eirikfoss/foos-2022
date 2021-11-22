import React, { useEffect } from "react";
import "./_selectPlayers.scss";
import Player from "../player/Player";
import {
  handleChosenPlayer,
  setChosenPlayers,
  shuffling,
  sortPlayersBy
} from "../../redux/players/player-action";
import { useSelector, useDispatch } from "react-redux";
import { createMatch, removeMatch } from "../../redux/matches/match-action";
import redShirt from "../../assets/images/redShirt_large.png";
import blueShirt from "../../assets/images/blueShirt_large.png";
import startSound from "../../assets/sounds/startround_01.mp3";

const SelectPlayers = props => {
  const dispatch = useDispatch();
  const location = props.location;
  let matches = props.matches;

  let {isLoading} = useSelector(state => state.matchReducer);

  let {
    players,
    chosenPlayers: chosenPlayerList,
    isShuffling,
    sortBy,
    departments
  } = useSelector(state => state.playerReducer);

  let playerList = [...players];

  const filterDepartment = dep => {
    dispatch(sortPlayersBy(dep));
  };

  const startRoundMusic = new Audio(startSound);

  sortBy === "All"
    ? (playerList = playerList)
    : (playerList = playerList.filter(player => player.department === sortBy));



  useEffect(() => {
    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          filterDepartment(e.target.innerHTML);

          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML === this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt === y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  }, []);
  /*
sortedMatches = sortedMatches.sort((b, a) =>
      b.updatedAt > a.updatedAt ? -1 : 1
*/

  //render a list of players
  const renderPlayers = () => {
    let sortedPlayers = [...playerList];
    sortedPlayers = sortedPlayers.sort((b, a) =>
      a.username > b.username ? -1 : 1
    );

    return sortedPlayers.map(currentPlayer => {
      return (
        <Player
          chosen={() => {
            handleChosen(currentPlayer);
          }}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  const handleChosen = player => {
    let cList = chosenPlayerList;
    let pList = players;

    console.log(player);

    if (pList.includes(player)) {
      if (cList.length <= 3) {
        let index = pList.indexOf(player);
        if (index !== -1) {
          pList.splice(index, 1);
        }
      } else return;

      cList.push(player);
    } else {
      let index = cList.indexOf(player);
      if (index !== -1) {
        cList.splice(index, 1);
      }

      pList.push(player);
    }

    dispatch(handleChosenPlayer(playerList, chosenPlayerList));
  };

  const shuffleChosen = array => {
    let i = array.length,
      temp,
      rand;

    while (0 !== i) {
      rand = Math.floor(Math.random() * i);
      i -= 1;

      temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }

    return array;
  };

  const shuffle = async () => {
    dispatch(shuffling());

    let i = 1;

    function loop() {
      setTimeout(() => {
        dispatch(setChosenPlayers(shuffleChosen(chosenPlayerList)));
        i++;
        if (i < 15) {
          loop();
        }
      }, 300);
    }

    loop();
    console.log("hello");
    dispatch(shuffling());
  };

  //Render a list of chosen players
  const renderChosenPlayers = () => {
    return chosenPlayerList.map(currentPlayer => {
      return (
        <Player
          chosen={() => handleChosen(currentPlayer)}
          player={currentPlayer}
          key={currentPlayer._id}
        />
      );
    });
  };

  const renderMatchOptions = () => {
    return (
      <>
        {chosenPlayerList.length > 3 ? (
          <div className="c_team-options-container">
            <div className="c_team-options">
              {!isShuffling && (
                <button className="c_button-team-options" onClick={shuffle}>
                  SHUFFLE
                </button>
              )}
            </div>
             {!isLoading ? (<button className="c_start-game-button" onClick={startGame}>
              START GAME
            </button>) : <div></div>
              }
            
          </div>
        ) : (
            <div></div>
          )}
      </>
    );
  };

  const startGame = async () => {
    let teams = {
      blue: { players: [], score: 0, adjustment: 0 },
      red: { players: [], score: 0, adjustment: 0 }
    };
    let matchOver = false;

    if (chosenPlayerList.length === 4) {
      for (let i = 0; i < 2; i++) {
        teams.blue.players.push(chosenPlayerList[i]);
      }

      for (let i = 2; i < 4; i++) {
        teams.red.players.push(chosenPlayerList[i]);
      }

      const matchData = {
        teams,
        location,
        matchOver
      };

      dispatch(createMatch(matchData));
      if (matches.length > 15) {
        dispatch(removeMatch(matches[0]._id));
      }


    }
  };

  return (
    <div className="c_select-players-container">
      <div className="c_player-list-container">
        <div className="custom-select">
          <select>
            <option value="0">Filter Players</option>
            <option value="All">All</option>
            {departments.map(d => (
              <option value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>{renderPlayers()}</div>
      </div>

      <div className="c_selected-players-container">
        <div className="c_team-container">
          <div className="c_team-img-container">
            <img src={blueShirt} alt="red shirt" />
          </div>

          <div className="c_players-container">
            <div
              className={`c_selected-player ${
                chosenPlayerList[0] ? "p_background-white" : ""
                }`}
            >
              {chosenPlayerList[0] && (
                <Player
                  chosen={() => {
                    handleChosen(chosenPlayerList[0]);
                  }}
                  player={chosenPlayerList[0]}
                  key={chosenPlayerList[0]._id}
                />
              )}
            </div>

            <div
              className={`c_selected-player ${
                chosenPlayerList[1] ? "p_background-white" : ""
                }`}
            >
              {chosenPlayerList[1] && (
                <Player
                  chosen={() => {
                    handleChosen(chosenPlayerList[1]);
                  }}
                  player={chosenPlayerList[1]}
                  key={chosenPlayerList[1]._id}
                />
              )}
            </div>
          </div>
        </div>

        <div className="c_breakline"></div>

        <div className="c_team-container">
          <div className="c_team-img-container">
            <img src={redShirt} alt="red shirt" />
          </div>

          <div className="c_players-container">
            <div
              className={`c_selected-player ${
                chosenPlayerList[2] ? "p_background-white" : ""
                }`}
            >
              {chosenPlayerList[2] && (
                <Player
                  chosen={() => {
                    handleChosen(chosenPlayerList[2]);
                  }}
                  player={chosenPlayerList[2]}
                  key={chosenPlayerList[2]._id}
                />
              )}
            </div>

            <div
              className={`c_selected-player ${
                chosenPlayerList[3] ? "p_background-white" : ""
                }`}
            >
              {chosenPlayerList[3] && (
                <Player
                  chosen={() => {
                    handleChosen(chosenPlayerList[3]);
                  }}
                  player={chosenPlayerList[3]}
                  key={chosenPlayerList[3]._id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {renderMatchOptions()}
    </div>
  );
};

export default SelectPlayers;
