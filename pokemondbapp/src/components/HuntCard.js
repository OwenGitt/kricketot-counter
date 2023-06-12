/**
 *
 * 
 *  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/" +
            props.value["Generation-URL"] +
            "/shiny/" +
            json.id +
            ".png"
 * 
 * @author Owen Gittins
 */

import { useEffect, useState } from "react";
import "./styleSheets/HuntCardStyles.css";

function HuntCard(props) {
  const [basicSprite, setBasicSprite] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.value.Target)
      .then((response) => response.json())
      .then((json) => {
        setBasicSprite(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/" +
            json.id +
            ".gif"
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleCardClick = () => {
    props.passHuntData(
      props.value.Name,
      props.value.Target,
      props.value.Shinies,
      props.value.Total_Encounters,
      props.value.Generation,
      props.value.Location
    );
    console.log("a");
  };

  return (
    <div className="huntCard" onClick={handleCardClick}>
      <p>{props.value.Name}</p>
      <img src={basicSprite}></img>
    </div>
  );
}
export default HuntCard;
