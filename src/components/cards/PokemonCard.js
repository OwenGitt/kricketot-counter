import React, { useState } from "react";
import typeColours from "../../json_data/typeColours.json";
import fairyPokemon from "../../json_data/fairyPokemon.json";
import "../../styleSheets/pokemonCardStyles.css";
import { formatPokemonNames, formatText } from "../../textReplacer.tsx";

function PokemonCard(props) {
  const [types, setTypes] = useState([]);
  const [basicSprite, setBasicSprite] = useState("");
  const [generation1Sprite, setGeneration1Sprite] = useState("");
  const [generation2Sprite, setGeneration2Sprite] = useState("");
  const [generation3Sprite, setGeneration3Sprite] = useState("");
  const [generation4Sprite, setGeneration4Sprite] = useState("");
  const [typesCount, setTypesCount] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
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
          setBasicSprite(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              json.id +
              ".png",
          );
          setGeneration1Sprite(
            json.sprites.versions["generation-i"][
              Object.keys(json.sprites.versions["generation-i"])[0]
            ].front_default,
          );
          setGeneration2Sprite(
            json.sprites.versions["generation-ii"][
              Object.keys(json.sprites.versions["generation-ii"])[0]
            ].front_default,
          );
          setGeneration3Sprite(
            json.sprites.versions["generation-iii"][
              Object.keys(json.sprites.versions["generation-iii"])[0]
            ].front_default,
          );
          setGeneration4Sprite(
            json.sprites.versions["generation-iv"][
              Object.keys(json.sprites.versions["generation-iv"])[0]
            ].front_default,
          );
          setCompleted(true);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  const displayPokemonTypes = () => {
    if (fairyPokemon[props.value.name]) {
      return fairyPokemon[props.value.name].map((type) => (
        <div
          className="pokemonType"
          style={{ backgroundColor: typeColours[type.type.name] }}
        >
          {formatText(type.type.name)}
        </div>
      ));
    } else {
      return types.map((type) => (
        <div
          className="pokemonType"
          style={{ backgroundColor: typeColours[type.type.name] }}
        >
          {formatText(type.type.name)}
        </div>
      ));
    }
  };

  return (
    <>
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
                      (types[0].type.name === "fairy"
                        ? `#808081`
                        : typeColours[types[0].type.name]) +
                      `,` +
                      (types[1].type.name === "fairy"
                        ? `#808081`
                        : typeColours[types[1].type.name]) +
                      `)`
                    : `linear-gradient(` +
                      (types[0].type.name === "fairy"
                        ? typeColours["normal"]
                        : typeColours[types[0].type.name]) +
                      `,
               #808081
              )`
                  : null,
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
              alt={formatPokemonNames(props.value.name)}
              loading="lazy"
            ></img>
            <div className="pokemonCardName">
              {formatPokemonNames(props.value.name)}
            </div>

            <div className="pokemonCardTypes">
              {types.length !== 0 ? (
                displayPokemonTypes()
              ) : (
                <div>LOADING...</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PokemonCard;
