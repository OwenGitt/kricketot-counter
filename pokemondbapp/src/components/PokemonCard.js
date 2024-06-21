import React, { useEffect, useState } from "react";
import typeColours from "./jsonData/typeColours.json";
import "./styleSheets/pokemonCardStyles.css";

/**
 * Pokemon Cards
 *
 * Displays a card for each pokemon...
 *
 * @author Owen Gittins
 */

function PokemonCard(props) {
  const [pokemonID, setPokemonID] = useState("");
  const [types, setTypes] = useState([]);
  const [basicSprite, setBasicSprite] = useState("");
  const [generation1Sprite, setGeneration1Sprite] = useState("");
  const [generation2Sprite, setGeneration2Sprite] = useState("");
  const [generation3Sprite, setGeneration3Sprite] = useState("");
  const [generation4Sprite, setGeneration4Sprite] = useState("");
  const [typesCount, setTypesCount] = useState(0);
  const [mouseOver, setMouseOver] = useState([false]);
  const [loading, setLoading] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  const handleMouseOver = () => setMouseOver(true);
  const handleMouseOut = () => setMouseOver(false);

  const initialisePokemonCardData = () => {
    if (typesCount === 0) {
      setTypesCount(typesCount + 1);
      fetch(props.value.url)
        .then((response) => response.json())
        .then((json) => {
          setTypes(json.types);
          setPokemonID(json.id);
          setBasicSprite(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              json.id +
              ".png"
          );
          setGeneration1Sprite(
            json.sprites.versions["generation-i"][
              Object.keys(json.sprites.versions["generation-i"])[0]
            ].front_default
          );
          setGeneration2Sprite(
            json.sprites.versions["generation-ii"][
              Object.keys(json.sprites.versions["generation-ii"])[0]
            ].front_default
          );
          setGeneration3Sprite(
            json.sprites.versions["generation-iii"][
              Object.keys(json.sprites.versions["generation-iii"])[0]
            ].front_default
          );
          setGeneration4Sprite(
            json.sprites.versions["generation-iv"][
              Object.keys(json.sprites.versions["generation-iv"])[0]
            ].front_default
          );
          setCompleted(true);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  return (
    <div>
      {initialisePokemonCardData()}
      {!completed ? (
        <>{loading !== false && <div className="pokemonCard"></div>}</>
      ) : (
        <>
          <div
            key={props.value.name}
            className="pokemonCard"
            onClick={() => props.fetchPokemonData(props.value.url)}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            style={{
              background:
                mouseOver === true && types !== null
                  ? types.length === 2
                    ? `linear-gradient(` +
                      typeColours[types[0].type.name] +
                      `,` +
                      typeColours[types[1].type.name] +
                      `)`
                    : `linear-gradient(` +
                      typeColours[types[0].type.name] +
                      `,
                   #808081
                  )`
                  : `linear-gradient(100deg,  #808081 0%,  #808081 0%)`,
            }}
          >
            <img
              src={
                props.generation === "generation-v"
                  ? basicSprite
                  : props.generation === "generation-i"
                  ? generation1Sprite
                  : props.generation === "generation-ii"
                  ? generation2Sprite
                  : props.generation === "generation-iii"
                  ? generation3Sprite
                  : generation4Sprite
              }
              alt={
                props.value.name.charAt(0).toUpperCase() +
                props.value.name.slice(1)
              }
              loading="lazy"
            ></img>
            <div className="pokemonCardName">
              {props.value.name.charAt(0).toUpperCase() +
                props.value.name.slice(1)}
            </div>

            <div className="pokemonCardTypes">
              {types != [] ? (
                types.map((type) => (
                  <div
                    className="pokemonType"
                    style={{ backgroundColor: typeColours[type.type.name] }}
                  >
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </div>
                ))
              ) : (
                <div>LOADING</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} //
//
/* 
const [evolutionDetails] = useState(["gender",
                                      "held_item",
                                      "item",
                                      "known_move",
                                      "known_move_type",
                                      "location",
                                      "min_affection",
                                      "min_beauty",
                                      "min_happiness",
                                      "min_level",
                                      "needs_overworld_rain",
                                      "party_species",
                                      "party_type",
                                      "relative_physical_stats",
                                      "time_of_day",
                                      "trade_species"]);
  const [evolutionMethod, setEvolutionMethod] = useState([])

const checkEvolutionDetails = () => {
  for (let i = 0; i < evolutionDetails.length; i++) {
    const item = evolutionDetails[i];
    console.log(evolutions.evolves_to[0].evolution_details[0][item]);
    if ( evolutions.evolves_to[0].evolution_details[0][item] === null || evolutions.evolves_to[0].evolution_details[0][item] === undefined || evolutions.evolves_to[0].evolution_details[0][item] === false ) {
       setEvolutionMethod("")
    }
   else {
     setEvolutionMethod(evolutions.evolves_to[0].evolution_details[0][item]) 
   }
  } 
}







*/

export default PokemonCard;
