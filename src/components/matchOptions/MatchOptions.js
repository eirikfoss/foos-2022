import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMatch, removeMatch } from "../../redux/matches/match-action";
import {
    setChosenPlayers
  } from "../../redux/players/player-action";
import shuffleChosen from "../../services/shuffleList";


const MatchOptions = props => {

    const dispatch = useDispatch();
    let {isLoading} = useSelector(state => state.matchReducer);
    let {
        chosenPlayers: chosenPlayerList,
        isShuffling
      } = useSelector(state => state.playerReducer);  
    let {location, matches} = props

      

    const shuffle = () => {
    console.log("ad");
    let i = 1;
    loop();

        function loop() {
        
            setTimeout(() => {
            dispatch(setChosenPlayers(shuffleChosen(chosenPlayerList)));
            i++;
            if (i < 15) {
                console.log(i);        
                loop();
            }
            }, 300);
        
        }

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
        )
   

    
} 

export default MatchOptions;