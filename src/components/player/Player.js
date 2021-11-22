import React, {useState, useEffect} from "react";
import getplayerImages from "../../services/getPlayerImg";
import "./_player.scss";

const Player = props => {
  const {player} = props;
  const [image, setImage] = useState("");

  /*
  const setPlayerImg = async () => {
    let safeName = player.username
      .replace("ø", "%C3%B5")
      .replace("å", "%C3%A5")
      .replace("æ", "%C3%A6")
      .replace("Ø", "%C3%98")
      .replace("Å", "%C3%85")
      .replace("Æ", "%C3%86");
    /let response = await getplayerImages(safeName);

    let img = document.createElement("img");
    img = window.URL.createObjectURL(response.fileBlob);
    setImage(img);
  };

  useEffect(() => {
    //setImage(getPlayerImg(player.username));
    setPlayerImg();
  }, []);
  */

  return (
    <div onClick={props.chosen}>
      
        <div className="c_player-element">
          
        
          <h2>{props.player.username}</h2>
          
        </div>
        
      
    </div>

  );
};

export default Player;
