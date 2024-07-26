import React, { useEffect, useState } from "react";
import typeColours from "../json_data/typeColours.json";
import statNames from "../json_data/statNames.json";
import "../styleSheets/SidebarStyles.css";
import Evolutions from "./Evolutions";
import fairyPokemon from "../json_data/fairyPokemon.json";

function Sidebar(props) {
  const [abilityData, setAbilityData] = useState("");
  const [abilityDataVisible, setAbilityDataVisible] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [normalSprite, setNormalSprite] = useState("");
  const [shinySprite, setShinySprite] = useState("");
  const [femaleSprite, setFemaleSprite] = useState("");

  const fetchAbilityData = (name) => {
    fetch("https://pokeapi.co/api/v2/ability/" + name)
      .then((response) => response.json())
      .then((json) => {
        let enEntry = json.effect_entries.find(
          (key) => key.language.name === "en"
        );
        setAbilityData(enEntry.effect);
        setAbilityDataVisible(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  function fetchLocationData() {
    fetch(
      "https://pokeapi.co/api/v2/pokemon/" + props.pokemonID + "/encounters"
    )
      .then((response) => response.json())
      .then((json) => {
        setLocationData(json);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  useEffect(() => {
    if (props.visible) {
      fetchLocationData();
    }
    setAbilityDataVisible(props.abilityDataVisible);
  }, [props.pokemonID]);

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
            ].front_default
          );
          setShinySprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].front_shiny
          );
        } else {
          setNormalSprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_default
          );
          setShinySprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_shiny
          );
          setFemaleSprite(
            json.sprites.versions[props.generation][
              Object.keys(json.sprites.versions[props.generation])[0]
            ].animated.front_female
          );
        }
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
          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
        </div>
      ));
    } else {
      return props.types.map((type) => (
        <div
          className="sidebar_pokemonType"
          style={{ backgroundColor: typeColours[type.type.name] }}
        >
          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
        </div>
      ));
    }
  };

  const formatPokemonNames = (name) => {
    // Format Pokemon names to have capitals at the start and remove dashes
    return (
      name.charAt(0).toUpperCase() +
      name
        .slice(1)
        .replace("r-m", "r. M")
        .replace("-jr", " jr.")
        .replace("-f", "♀")
        .replace("-m", "♂")
        .replace("-ordinary", "")
        .replace("-incarnate", "")
        .replace("-aria", "")
        .replace("-land", "")
        .replace("-altered", "")
    );
  };

  return (
    <div
      className={props.visible ? "sidebarContainer" : "hideSidebarContainer"}
      style={{
        width: props.visible ? (props.isMobile ? "100%" : "25%") : 0,
        padding: props.visible ? "1%" : 0,
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
          <span className="closeButton" onClick={props.handleSidebarClose}>
            &#10005;
          </span>

          <div>
            <img
              src={normalSprite}
              alt={
                props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)
              }
            ></img>
            {shinySprite !== undefined ? (
              <img
                src={shinySprite}
                alt={
                  "Shiny " +
                  props.pokemonName.charAt(0).toUpperCase() +
                  props.pokemonName.slice(1)
                }
              ></img>
            ) : null}
          </div>
        </div>
        <div className="sidebar_pokemonCardTypes">{displayPokemonTypes()}</div>

        <div className="sidebarBody">
          <h4 className="sidebarHeader">Description</h4>
          <div className="sidebarDescription">
            {props.flavourText !== "" ? props.flavourText : <div>LOADING</div>}
          </div>

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
                        props.evolutions.species.name
                    )
                  }
                >
                  {props.evolutions.species.name.charAt(0).toUpperCase() +
                    props.evolutions.species.name.slice(1)}
                </div>
              </div>
            )
          ) : (
            <div>LOADING</div>
          )}

          <div>
            <h4 className="sidebarHeader">Abilities</h4>
            <div className="abilityContainer">
              {props.abilities.map((ability, key) => (
                <div
                  key={key}
                  className="abilityBox"
                  onClick={() => fetchAbilityData(ability.ability.name)}
                >
                  {ability.ability.name.charAt(0).toUpperCase() +
                    ability.ability.name.slice(1)}
                </div>
              ))}
            </div>
            {abilityDataVisible ? (
              <p
                className="abilityData"
                onClick={() => setAbilityDataVisible(false)}
              >
                {abilityData}
              </p>
            ) : null}
          </div>

          <h4 className="sidebarHeader">Height & Weight</h4>
          <div className="pokemon_height_weight_container">
            <div className="pokemon_height_weight_box" key="height">
              {props.pokemonHeight / 10 + "m"}
            </div>
            <div className="pokemon_height_weight_box" key="weight">
              {props.pokemonWeight / 10 + "kg"}
            </div>
          </div>

          {normalSprite && femaleSprite ? (
            <div>
              <h4 className="sidebarHeader">Gender Differences</h4>
              <div className="genderDifferences">
                <div>
                  <img
                    src={normalSprite}
                    alt={
                      props.pokemonName.charAt(0).toUpperCase() +
                      props.pokemonName.slice(1)
                    }
                  ></img>
                  <img
                    src={femaleSprite}
                    alt={
                      "Female " +
                      props.pokemonName.charAt(0).toUpperCase() +
                      props.pokemonName.slice(1)
                    }
                  ></img>
                </div>
              </div>
            </div>
          ) : null}

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
                  {"4x " + a_type.charAt(0).toUpperCase() + a_type.slice(1)}
                </div>
              ))}

              {props.superEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"2x " + a_type.charAt(0).toUpperCase() + a_type.slice(1)}
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
                  {"1x " + a_type.charAt(0).toUpperCase() + a_type.slice(1)}
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
                    {"0.5x " + a_type.charAt(0).toUpperCase() + a_type.slice(1)}
                  </div>
                ))}
                {props.doubleUneffective.map((a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"0.25x " +
                      a_type.charAt(0).toUpperCase() +
                      a_type.slice(1)}
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
                    {"0x " + a_type.charAt(0).toUpperCase() + a_type.slice(1)}
                  </div>
                ))
              )}
            </div>

            {/*<h5 className="sidebarTitle">Locations</h5>
            <div>
              {locationData.map((location, key) => (
                <div>{location.location_area.name}</div>
              ))}
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
