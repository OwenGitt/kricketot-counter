import React, { useEffect, useState } from "react";
import typeColours from "../jsonData/typeColours.json";
import statNames from "../jsonData/statNames.json";
import "../styleSheets/SidebarStyles.css";

import Evolutions from "./Evolutions";
function Sidebar(props) {
  const [abilityData, setAbilityData] = useState("");
  const [abilityDataVisible, setAbilityDataVisible] = useState(false);

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

  useEffect(() => {
    setAbilityDataVisible(props.abilityDataVisible);
  }, [props.pokemonID]);

  return (
    <div
      className={props.visible ? "sidebarContainer" : "hideSidebarContainer"}
      style={{
        width: props.visible ? (props.isMobile ? "100%" : "20%") : 0,
        padding: props.visible ? "1%" : 0,
        minWidth: props.visible ? "350px" : 0,
      }}
    >
      <div className="sidebarContents">
        <span></span>
        <div className="sidebarHeader">
          <div className="sidebarTitle">
            <h2 className="sidebarTitle-h2">
              #
              {props.pokemonID < 10
                ? "00" + props.pokemonID + " "
                : props.pokemonID < 100
                ? "0" + props.pokemonID + " "
                : props.pokemonID + " "}
              {props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)}
            </h2>
          </div>
          <span className="closeButton" onClick={props.handleSidebarClose}>
            &#10005;
          </span>

          <div>
            <img
              src={props.shinySprite}
              alt={
                "Shiny " +
                props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)
              }
            ></img>
            <img
              src={props.sprite}
              alt={
                props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)
              }
            ></img>
          </div>
        </div>
        <div className="sidebar_pokemonCardTypes">
          {props.types.map((type) => (
            <div
              className="sidebar_pokemonType"
              style={{ backgroundColor: typeColours[type.type.name] }}
            >
              {type.type.name.charAt(0).toUpperCase() +
                type.type.name.slice(1) +
                " "}
            </div>
          ))}
        </div>

        <div className="sidebarBody">
          <h4 className="sidebarDescriptionTitle">Description</h4>
          <div className="sidebarDescription">
            {props.flavourText !== "" ? props.flavourText : <div>LOADING</div>}
          </div>

          <h4 className="sidebarStatsTitle">Stats</h4>
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

          <div>
            <h4 className="sidebarAbilitiesTitle">Abilities</h4>
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

          <h4 className="sidebarHWTitle">Height & Weight</h4>
          <div className="pokemon_height_weight_container">
            <div className="pokemon_height_weight_box" key="height">
              {props.pokemonHeight / 10 + "m"}
            </div>
            <div className="pokemon_height_weight_box" key="weight">
              {props.pokemonWeight / 10 + "kg"}
            </div>
          </div>

          <h4 className="sidebarEvosTitle">Evolutions</h4>
          <div className="pokemon_Evolution_Container">
            {props.evolutions.length !== 0 ? (
              props.evolutions.evolves_to.length >= 1 ? (
                <Evolutions
                  evolutions={props.evolutions}
                  fetchData={props.fetchData}
                ></Evolutions>
              ) : (
                <div className="pokemon_NO_Evolution_Box">
                  This pokemon has no evolutions in generations 1-5
                </div>
              )
            ) : (
              <div>LOADING</div>
            )}
          </div>

          <h4 className="sidebarTypeMTitle">Type Matchups</h4>

          <div className="typeMatchupsContainer">
            <h5 className="sidebarSETitle">Super Effective</h5>
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

            <h5 className="sidebarNETitle">Normal Effective</h5>
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
            <h5 className="sidebarNVETitle">Not Very Effective</h5>
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

            <h5 className="sidebarITitle">Immunities</h5>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
