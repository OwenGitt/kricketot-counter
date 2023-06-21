import React from "react";
import typeColours from "./jsonData/typeColours.json";
import statNames from "./jsonData/statNames.json";
import "./styleSheets/SidebarStyles.css";
import EvolutionItem from "./EvolutionItem";
import CheckEvolution from "./CheckEvolution";
function Sidebar(props) {
  const Evolutions = () => {
    return (
      <div className="pokemon_Evolution_Container">
        {/* Display first pokemon in evolution line */}
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
        {/* Display an arrow box */}
        <div className="pokemon_Evolution_Method_Box">
          {/** Check to see if the evolution is split or not, then determine the pokemons evolution method */}
          {props.evolutions.evolves_to.length === 1 ? (
            props.evolutions.evolves_to[0].evolution_details[0].item !==
            null ? (
              <EvolutionItem
                method={"Use"}
                url={
                  props.evolutions.evolves_to[0].evolution_details[0].item.url
                }
              />
            ) : props.evolutions.evolves_to[0].evolution_details[0]
                .held_item !== null ? (
              <EvolutionItem
                method={"Trade"}
                url={
                  props.evolutions.evolves_to[0].evolution_details[0].held_item
                    .url
                }
              />
            ) : (
              <CheckEvolution
                evolutionDetails={
                  props.evolutions.evolves_to[0].evolution_details[0]
                }
              ></CheckEvolution>
            )
          ) : /*If the evolution is split at stage 1-2 display both evolution methods*/
          props.evolutions.evolves_to.length === 2 ? (
            <div className="item_Evolution_Container">
              {/* Display evolution method for the first pokemon in the split evolution */}
              {props.evolutions.evolves_to[0].evolution_details[0].item !==
              null ? (
                <EvolutionItem
                  method={"Use"}
                  url={
                    props.evolutions.evolves_to[0].evolution_details[0].item.url
                  }
                />
              ) : props.evolutions.evolves_to[0].evolution_details[0]
                  .held_item !== null ? (
                <EvolutionItem
                  method={"Trade"}
                  url={
                    props.evolutions.evolves_to[0].evolution_details[0]
                      .held_item.url
                  }
                />
              ) : (
                <CheckEvolution
                  evolutionDetails={
                    props.evolutions.evolves_to[0].evolution_details[0]
                  }
                ></CheckEvolution>
              )}
              {/* Display evolution method for the second pokemon in the split evolution */}
              {props.evolutions.evolves_to[1].evolution_details[0].item !==
              null ? (
                <EvolutionItem
                  method={"Use"}
                  url={
                    props.evolutions.evolves_to[1].evolution_details[0].item.url
                  }
                />
              ) : props.evolutions.evolves_to[1].evolution_details[0]
                  .held_item !== null ? (
                <EvolutionItem
                  method={"Trade"}
                  url={
                    props.evolutions.evolves_to[1].evolution_details[0]
                      .held_item.url
                  }
                />
              ) : (
                <CheckEvolution
                  evolutionDetails={
                    props.evolutions.evolves_to[1].evolution_details[0]
                  }
                ></CheckEvolution>
              )}
            </div>
          ) : null}
        </div>
        {/* Display split evolution line of the pokemon at stage 1-2*/}
        {/** CHANGE FROM HERE DOWN TO WHAT IS ABOVE ALSO SPLIT THE ACTUALLY EVOS FROM THE ITEMS HERE AS WELL */}
        {props.evolutions.evolves_to.length === 2 ? (
          <div>
            <div
              className="pokemon_Evolution_Box"
              onClick={() =>
                props.fetchData(
                  "https://pokeapi.co/api/v2/pokemon/" +
                    props.evolutions[0].species.name
                )
              }
            >
              {props.evolutions.evolves_to[0].species.name
                .charAt(0)
                .toUpperCase() +
                props.evolutions.evolves_to[0].species.name.slice(1)}
            </div>
            <div
              className="pokemon_Evolution_Box"
              onClick={() =>
                props.fetchData(
                  "https://pokeapi.co/api/v2/pokemon/" +
                    props.evolutions[1].species.name
                )
              }
            >
              {props.evolutions.evolves_to[1].species.name
                .charAt(0)
                .toUpperCase() +
                props.evolutions.evolves_to[1].species.name.slice(1)}
            </div>
          </div>
        ) : (
          /* Otherwise display next pokemon in the evolution line */
          <div className="pokemon_Evolution_Box_Container">
            <div
              className="pokemon_Evolution_Box"
              onClick={() =>
                props.fetchData(
                  "https://pokeapi.co/api/v2/pokemon/" +
                    props.evolutions.evolves_to[0].species.name
                )
              }
            >
              {props.evolutions.evolves_to[0].species.name
                .charAt(0)
                .toUpperCase() +
                props.evolutions.evolves_to[0].species.name.slice(1)}
            </div>
            {/* Check if there is another pokemon in the evolution line, if so display another arrow */}
            {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
              <div className="pokemon_Evolution_Method_Box">
                {/* Display evolution method for the next evolution */}
                {props.evolutions.evolves_to[0].evolves_to[0]
                  .evolution_details[0].trigger.name === "level-up" ? (
                  "Lv." +
                  props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].min_level
                ) : props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].trigger.name === "trade" ? (
                  props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].held_item !== null ? (
                    <EvolutionItem
                      method={"Trade"}
                      url={
                        props.evolutions.evolves_to[0].evolves_to[0]
                          .evolution_details[0].held_item.url
                      }
                    />
                  ) : (
                    "Trade"
                  )
                ) : props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].trigger.name === "use-item" ? (
                  <EvolutionItem
                    method={"Use"}
                    url={
                      props.evolutions.evolves_to[0].evolves_to[0]
                        .evolution_details[0].item.url
                    }
                  />
                ) : null}
              </div>
            ) : props.evolutions.evolves_to[0].evolves_to.length === 2 ? (
              <div className="pokemon_Evolution_Method_Box">
                {/* Display evolution method for the first pokemon in the split evolution */}
                {props.evolutions.evolves_to[0].evolves_to[0]
                  .evolution_details[0].trigger.name === "level-up" ? (
                  "Lv." +
                  props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].min_level
                ) : props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].trigger.name === "trade" ? (
                  props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].held_item.url !== "" ? (
                    <EvolutionItem
                      method={"Trade"}
                      url={
                        props.evolutions.evolves_to[0].evolves_to[0]
                          .evolution_details[0].held_item.url
                      }
                    />
                  ) : null
                ) : props.evolutions.evolves_to[0].evolves_to[0]
                    .evolution_details[0].trigger.name === "use-item" ? (
                  <EvolutionItem
                    method={"Use"}
                    url={
                      props.evolutions.evolves_to[0].evolves_to[0]
                        .evolution_details[0].item.url
                    }
                  />
                ) : null}
                {/* Display evolution method for the second pokemon if its a split evolution */}
                {props.evolutions.evolves_to[0].evolves_to[1]
                  .evolution_details[0].trigger.name === "level-up" ? (
                  "Lv." +
                  props.evolutions.evolves_to[0].evolves_to[1]
                    .evolution_details[0].min_level
                ) : props.evolutions.evolves_to[0].evolves_to[1]
                    .evolution_details[0].trigger.name === "trade" ? (
                  "Trade" +
                    props.evolutions.evolves_to[0].evolves_to[1]
                      .evolution_details[0].held_item.url !==
                  "" ? (
                    <EvolutionItem
                      method={"Trade"}
                      url={
                        props.evolutions.evolves_to[0].evolves_to[1]
                          .evolution_details[0].held_item.url
                      }
                    />
                  ) : null
                ) : props.evolutions.evolves_to[0].evolves_to[1]
                    .evolution_details[0].trigger.name === "use-item" ? (
                  <EvolutionItem
                    method={"Use"}
                    url={
                      props.evolutions.evolves_to[0].evolves_to[1]
                        .evolution_details[0].item.url
                    }
                  />
                ) : null}
              </div>
            ) : null}

            {/* If there is only 1 evolution left to do display it in a box */}
            {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
              <div
                className="pokemon_Evolution_Box"
                onClick={() =>
                  props.fetchData(
                    "https://pokeapi.co/api/v2/pokemon/" +
                      props.evolutions.evolves_to[0].evolves_to[0].species.name
                  )
                }
              >
                {props.evolutions.evolves_to[0].evolves_to[0].species.name
                  .charAt(0)
                  .toUpperCase() +
                  props.evolutions.evolves_to[0].evolves_to[0].species.name.slice(
                    1
                  )}
              </div>
            ) : /* Otherwise display the split evolution line */
            props.evolutions.evolves_to[0].evolves_to.length === 2 ? (
              <div className="split_Evolution_Box_Container">
                <div
                  className="pokemon_Evolution_Box"
                  onClick={() =>
                    props.fetchData(
                      "https://pokeapi.co/api/v2/pokemon/" +
                        props.evolutions.evolves_to[0].evolves_to[0].species
                          .name
                    )
                  }
                >
                  {props.evolutions.evolves_to[0].evolves_to[0].species.name
                    .charAt(0)
                    .toUpperCase() +
                    props.evolutions.evolves_to[0].evolves_to[0].species.name.slice(
                      1
                    )}
                </div>
                <div
                  className="pokemon_Evolution_Box"
                  onClick={() =>
                    props.fetchData(
                      "https://pokeapi.co/api/v2/pokemon/" +
                        props.evolutions.evolves_to[0].evolves_to[1].species
                          .name
                    )
                  }
                >
                  {props.evolutions.evolves_to[0].evolves_to[1].species.name
                    .charAt(0)
                    .toUpperCase() +
                    props.evolutions.evolves_to[0].evolves_to[1].species.name.slice(
                      1
                    )}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={props.visible ? "sidebarContainer" : "hideSidebarContainer"}
      style={{
        width: props.visible ? "20%" : 0,
        padding: props.visible ? "1%" : 0,
      }}
    >
      <div className="sidebarContents">
        <span></span>
        <div className="sidebarHeader">
          <div className="sidebarTitle">
            <h2 className="sidebarTitle-h2">
              #{props.pokemonID + " "}
              {props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)}
            </h2>
          </div>
          <span className="closeButton" onClick={props.handleSidebarClose}>
            &#10005;
          </span>

          <div>
            <img src={props.shinySprite}></img> <img src={props.sprite}></img>
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
                <div key={key} className="abilityBox">
                  {ability.ability.name.charAt(0).toUpperCase() +
                    ability.ability.name.slice(1)}
                </div>
              ))}
            </div>
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
                Evolutions()
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
