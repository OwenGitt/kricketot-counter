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
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.value.Name)
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

  return (
    <div className="huntCard">
      <p>{props.value.Name}</p>
      <p>Generation: {props.value.Generation}</p>
      <p>Encounters: {props.value.Encounters}</p>
      <img src={basicSprite}></img>
    </div>
  );
}
export default HuntCard;
