import React, { useEffect, useState } from "react";
import typeColours from "../../json_data/typeColours.json";
import statNames from "../../json_data/statNames.json";
import "../../styleSheets/SidebarStyles.css";
import Evolutions from "./Evolutions";
import fairyPokemon from "../../json_data/fairyPokemon.json";
import LocationData from "./LocationData";
import { formatPokemonNames, formatText } from "../../textReplacer.tsx";

function Sidebar(props) {
  const [abilityData, setAbilityData] = useState("");
  const [abilityName, setAbilityName] = useState("");
  const [abilityDataVisible, setAbilityDataVisible] = useState(false);
  const [jsonLocationData, setJsonLocationData] = useState([]);
  const [normalSprite, setNormalSprite] = useState("");
  const [shinySprite, setShinySprite] = useState("");
  const [femaleSprite, setFemaleSprite] = useState("");
  const [femaleShinySprite, setFemaleShinySprite] = useState("");
  // const [genVGames] = useState(["black", "white", "black-2", "white-2"]);

  const fetchAbilityData = (name) => {
    fetch("https://pokeapi.co/api/v2/ability/" + name)
      .then((response) => response.json())
      .then((json) => {
        let enEntry = json.effect_entries.find(
          (key) => key.language.name === "en",
        );
        setAbilityName(name);
        setAbilityData(enEntry.effect);
        setAbilityDataVisible(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    let url =
      "https://pokeapi.co/api/v2/pokemon/" +
      (props.pokemonID === "" ? 1 : props.pokemonID) +
      "/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (props.generation !== "generation-v") {
          setNormalSprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].front_default,
          );
          setShinySprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].front_shiny,
          );
        } else {
          setNormalSprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_default,
          );
          setShinySprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_shiny,
          );
          setFemaleSprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_female,
          );
          setFemaleShinySprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_shiny_female,
          );
        }

        // Fetch location data
        fetch(
          "https://pokeapi.co/api/v2/pokemon/" +
            (props.pokemonID ? props.pokemonID : "1") +
            "/encounters",
        )
          .then((response) => response.json())
          .then((json) => {
            setJsonLocationData(json);
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [props.generation, props.pokemonID]);

  const displayPokemonTypes = () => {
    if (fairyPokemon[props.pokemonName]) {
      return fairyPokemon[props.pokemonName].map((type) => (
        <div
          className="sidebar_pokemonType"
          style={{ backgroundColor: typeColours[type.type.name] }}
        >
          {formatText(type.type.name)}
        </div>
      ));
    } else {
      return props.types.map((type) => (
        <div
          className="sidebar_pokemonType"
          style={{ backgroundColor: typeColours[type.type.name] }}
        >
          {formatText(type.type.name)}
        </div>
      ));
    }
  };

  /* Used to stop the sidebar closing animation breaking at small viewport sizes
    (where sidebar takes up 100% of screen), but doesn't affect larger viewports.
    This could be updated by making the page allow overflow-x as sidebar doesn't
    need to be sticky on small viewports, this could then allow the sidebar to go
    from 100% width to 0 as the card container slides in from the right.
   */
  const closeAnimation = () => {
    props.setSidebarClosing(true);
    setTimeout(props.handleSidebarClose, 300);
  };

  return (
    <div
      className={props.visible ? "sidebarContainer" : "hideSidebarContainer"}
      style={{
        width:
          props.visible && !props.sidebarClosing
            ? props.isMobile
              ? "100%"
              : "700px"
            : 0,
        margin:
          !props.nextVisible && !props.backVisible ? "10px 0 0" : "76px 0 0",
      }}
    >
      <div className="sidebarContents">
        <div className="sidebarHeader">
          <div className="sidebarTitle">
            <h2 className="sidebarTitle-h2">
              #
              {props.pokemonID < 10
                ? "00" + props.pokemonID + " "
                : props.pokemonID < 100
                  ? "0" + props.pokemonID + " "
                  : props.pokemonID + " "}
              {formatPokemonNames(props.pokemonName)}
            </h2>
          </div>
          <span
            className="closeButton"
            onClick={() => {
              closeAnimation();
            }}
          >
            &#10005;
          </span>

          <div>
            <img
              src={normalSprite}
              alt={formatPokemonNames(props.pokemonName)}
            ></img>
            {shinySprite !== undefined ? (
              <img
                src={shinySprite}
                alt={"Shiny " + formatPokemonNames(props.pokemonName)}
              ></img>
            ) : null}
          </div>
          <div className="sidebar_pokemonCardTypes">
            {displayPokemonTypes()}
          </div>
        </div>

        <section>
          <h4 className="sidebarHeader">Description</h4>
          <div className="sidebarDescription">
            {props.flavourText !== "" ? props.flavourText : <div>LOADING</div>}
          </div>
        </section>

        <section>
          <h4 className="sidebarHeader">Stats</h4>
          <div className="statContainer">
            {props.stats.map((stat, key) => (
              <div key={key} className="statBox">
                <div
                  className="statTitle"
                  style={{
                    backgroundColor: statNames["statColours"][stat.stat.name],
                  }}
                >
                  {statNames["statNames"][stat.stat.name]}
                </div>
                <div className="statNumber">{stat.base_stat}</div>
              </div>
            ))}
            <div className="statBox">
              <div className="statTitle" style={{ backgroundColor: "#957DAD" }}>
                TOT
              </div>
              <div className="statNumber">{props.total}</div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="sidebarHeader">Evolutions</h4>
          {props.evolutions.length !== 0 ? (
            props.evolutions.evolves_to.length >= 1 ? (
              <Evolutions
                evolutions={props.evolutions}
                fetchData={props.fetchData}
              ></Evolutions>
            ) : (
              <div className="pokemon_Evolution_Container">
                <div
                  className="pokemon_Evolution_Box"
                  onClick={() =>
                    props.fetchData(
                      "https://pokeapi.co/api/v2/pokemon/" +
                        props.evolutions.species.name,
                    )
                  }
                >
                  {formatText(props.evolutions.species.name)}
                </div>
              </div>
            )
          ) : (
            <div>LOADING</div>
          )}
        </section>

        <section className="abilityHeightWeight">
          <div>
            <h4 className="sidebarHeader">Abilities</h4>
            <div
              className="abilityContainer"
              style={{ margin: abilityDataVisible ? "0" : "0 0 5%" }}
            >
              {props.abilities.map((ability, key) => (
                <section>
                  {ability.is_hidden ? (
                    <div>Hidden Ability</div>
                  ) : (
                    <div>Ability {ability.slot}</div>
                  )}
                  <div
                    key={key}
                    className="abilityBox"
                    onClick={() => fetchAbilityData(ability.ability.name)}
                  >
                    {formatText(ability.ability.name)}
                  </div>
                </section>
              ))}
            </div>
            {abilityDataVisible ? (
              <div>
                <h4 className="sidebarSubHeader">{formatText(abilityName)}</h4>
                <p
                  className="abilityData"
                  onClick={() => setAbilityDataVisible(false)}
                >
                  {abilityData}
                </p>
              </div>
            ) : null}
          </div>

          <section className="pokemon_height_weight_container">
            <div>
              <h4 className="sidebarHeader">Height</h4>
              <div className="pokemon_height_weight_box" key="height">
                {props.pokemonHeight / 10 + "m"}
              </div>
            </div>
            <div>
              <h4 className="sidebarHeader">Weight</h4>
              <div className="pokemon_height_weight_box" key="weight">
                {props.pokemonWeight / 10 + "kg"}
              </div>
            </div>
          </section>
        </section>

        {normalSprite && femaleSprite ? (
          <section>
            <h4 className="sidebarHeader">Gender Differences</h4>
            <div className="genderDifferences">
              <div>
                <img
                  src={normalSprite}
                  alt={formatPokemonNames(props.pokemonName)}
                ></img>
                <img
                  src={femaleSprite}
                  alt={"Female " + formatPokemonNames(props.pokemonName)}
                ></img>
              </div>
              <div>
                <img
                  src={shinySprite}
                  alt={"Male Shiny " + formatPokemonNames(props.pokemonName)}
                ></img>
                <img
                  src={femaleShinySprite}
                  alt={"Female Shiny " + formatPokemonNames(props.pokemonName)}
                ></img>
              </div>
            </div>
          </section>
        ) : null}

        <section>
          <h4 className="sidebarHeader">Type Matchups</h4>
          <div className="typeMatchupsContainer">
            <h5 className="sidebarSubHeader">Super Effective</h5>
            <div className="typeMatchupsContainer-column" id="superEffective">
              {props.ultraEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  <div className="typeName">{formatText(a_type)}</div>
                  <div className="typeMultiplier"> 4x</div>
                </div>
              ))}

              {props.superEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  <div className="typeName">{formatText(a_type)}</div>
                  <div className="typeMultiplier"> 2x</div>
                </div>
              ))}
            </div>

            <h5 className="sidebarSubHeader">Normal Effective</h5>
            <div className="typeMatchupsContainer-column" id="normalEffective">
              {props.normalEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  <div className="typeName">{formatText(a_type)}</div>
                  <div className="typeMultiplier"> 1x</div>
                </div>
              ))}
            </div>
            <h5 className="sidebarSubHeader">Not Very Effective</h5>
            {props.notEffective.length === 0 &&
            props.doubleUneffective.length === 0 ? (
              <div className="emptyTypeMatchupList"> None </div>
            ) : (
              <div
                className="typeMatchupsContainer-column"
                id="notVeryEffective"
              >
                {props.notEffective.map((a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    <div className="typeName">{formatText(a_type)}</div>
                    <div className="typeMultiplier"> ½x</div>
                  </div>
                ))}
                {props.doubleUneffective.map((a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    <div className="typeName">{formatText(a_type)}</div>
                    <div className="typeMultiplier"> ¼x</div>
                  </div>
                ))}
              </div>
            )}

            <h5 className="sidebarSubHeader">Immunities</h5>
            <div className="typeMatchupsContainer-column" id="immune">
              {props.inEffective.length === 0 ? (
                <div className="emptyTypeMatchupList"> None </div>
              ) : (
                props.inEffective.map((a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    <div className="typeName">{formatText(a_type)}</div>
                    <div className="typeMultiplier"> 0x</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section>
          <h5 className="sidebarHeader">Game Locations</h5>
          <div>
            <LocationData jsonLocData={jsonLocationData} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
