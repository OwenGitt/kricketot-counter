import React from "react";
import typeColours from "./jsonData/typeColours.json";
import statNames from "./jsonData/statNames.json";
import "./styleSheets/SidebarStyles.css";

function Sidebar(props) {
  const Evolutions = () => {
    return (
      /*<div className='pokemon_Evolution_Box'>
        {(evolutions.evolves_to.length === 1 ? evolutions.species.name.charAt(0).toUpperCase() + evolutions.species.name.slice(1) + 
        (evolutions.evolves_to.length === 1 ? " -> " + evolutions.evolves_to[0].species.name.charAt(0).toUpperCase() + evolutions.evolves_to[0].species.name.slice(1) : "" ) +
        (evolutions.evolves_to[0].evolves_to.length === 1 ?  " -> " +
          evolutions.evolves_to[0].evolves_to[0].species.name.charAt(0).toUpperCase() +  evolutions.evolves_to[0].evolves_to[0].species.name.slice(1)  : "") : <div className='pokemon_Evolution_Box'> This pokemon has no evolutions in generations 1-5 </div>)}  
      </div> */
      <div className="pokemon_Evolution_Container">
        <div className="pokemon_Evolution_Box">
          {props.evolutions.species.name.charAt(0).toUpperCase() +
            props.evolutions.species.name.slice(1)}
        </div>
        <div className="pokemon_Evolution_Arrow_Box">{" -> "} </div>
        <div className="pokemon_Evolution_Box">
          {props.evolutions.evolves_to[0].species.name.charAt(0).toUpperCase() +
            props.evolutions.evolves_to[0].species.name.slice(1)}
        </div>
        {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
          <div className="pokemon_Evolution_Arrow_Box">{" -> "} </div>
        ) : null}
        {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
          <div className="pokemon_Evolution_Box">
            {props.evolutions.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
              props.evolutions.evolves_to[0].evolves_to[0].species.name.slice(
                1
              )}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="offCanvasContainer">
      <div
        show={props.show}
        onHide={props.handleClose}
        className="offCanvasContents"
      >
        <span></span>
        <div className="offCanvasHeader">
          <div className="offCanvasTitle">
            <h2>
              #{props.pokemonID + " "}
              {props.pokemonName.charAt(0).toUpperCase() +
                props.pokemonName.slice(1)}
            </h2>
          </div>
          {props.shinies.includes(props.pokemonName) ? (
            <div>
              <img src={props.shinySprite}></img> <img src={props.sprite}></img>
            </div>
          ) : (
            <img src={props.sprite}></img>
          )}
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

        <div className="offCanvasBody">
          <h4>Description</h4>
          <div>
            {props.flavourText != "" ? props.flavourText : <div>LOADING</div>}
          </div>

          <h4>Stats</h4>
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
            <h4>Abilities</h4>
            <div className="abilityContainer">
              {props.abilities.map((ability, key) => (
                <div key={key} className="abilityBox">
                  {ability.ability.name.charAt(0).toUpperCase() +
                    ability.ability.name.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <h4>Height & weight</h4>
          <div className="pokemon_height_weight_container">
            <div className="pokemon_height_weight_box" key="height">
              {props.pokemonHeight / 10 + "m"}
            </div>
            <div className="pokemon_height_weight_box" key="weight">
              {props.pokemonWeight / 10 + "kg"}
            </div>
          </div>

          <h4>Evolutions</h4>
          <div className="pokemon_Evolution_Container">
            {props.evolutions.length != 0 ? (
              props.evolutions.evolves_to.length === 1 ? (
                Evolutions()
              ) : (
                <div className="pokemon_Evolution_Box">
                  This pokemon has no evolutions in generations 1-5
                </div>
              )
            ) : (
              <div>LOADING</div>
            )}
          </div>

          <h4>Type Matchups</h4>

          <div className="typeMatchupsContainer">
            <h5>Super Effective</h5>
            <div className="typeMatchupsContainer-column" id="superEffective">
              {props.ultraEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"4x " + a_type}
                </div>
              ))}

              {props.superEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"2x " + a_type}
                </div>
              ))}
            </div>

            <h5>Normal Effective</h5>
            <div className="typeMatchupsContainer-column" id="normalEffective">
              {props.normalEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"1x " + a_type}
                </div>
              ))}
            </div>
            <h5>Not Very Effective</h5>
            <div className="typeMatchupsContainer-column" id="notVeryEffective">
              {props.notEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"0.5x " + a_type}
                </div>
              ))}
              {props.doubleUneffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"0.25x " + a_type}
                </div>
              ))}
            </div>
            <h5>Immunities</h5>
            <div className="typeMatchupsContainer-column" id="immune">
              {props.inEffective.map((a_type, key) => (
                <div
                  key={key}
                  className="typeMatchup"
                  style={{ backgroundColor: typeColours[a_type] }}
                >
                  {"0x " + a_type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
