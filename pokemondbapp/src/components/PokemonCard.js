import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import data from "./jsonData/types.json";
import typeColours from "./jsonData/typeColours.json";
import statNames from "./jsonData/statNames.json";
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
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [visible, setVisible] = useState(false);
  const [abilities, setAbilites] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [sprite, setSprite] = useState("");
  const [shinySprite, setSpriteShiny] = useState("");
  const [basicSprite, setBasicSprite] = useState("");
  const [show, setShow] = useState(false);
  const [total, setStatTotal] = useState(0);
  const [evolutions, setEvolutions] = useState([]);
  const [flavourText, setFlavourText] = useState("");
  const [typesCount, setTypesCount] = useState(0);
  const [notEffective, setNotEffective] = useState([]);
  const [normalEffective, setNormalEffective] = useState([]);
  const [superEffective, setSuperEffective] = useState([]);
  const [ultraEffective, setUltraEffective] = useState([]);
  const [inEffective, setIneffective] = useState([]);
  const [doubleUneffective, setDoubleUneffective] = useState([]);
  const [calculated, setCalculated] = useState([]);
  const [mouseOver, setMouseOver] = useState([false]);

  const handleMouseOver = () => setMouseOver(true);
  const handleMouseOut = () => setMouseOver(false);

  const handleClose = () => setShow(false);

  const fetchPokemonData = () => {
    fetch(props.value.url)
      .then((response) => response.json())
      .then((json) => {
        setPokemonName(json.name);
        setPokemonHeight(json.height);
        setPokemonWeight(json.weight);
        setAbilites(json.abilities);
        setStats(json.stats);
        setSpriteShiny(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/" +
            json.id +
            ".gif"
        );
        fetchFlavourText(json.id);
        fetchEvolutionChain(json.id);
        getPokemonData(json.stats);
        resetTypeList();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const fetchEvolutionChain = (id) => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then((response) => response.json())
      .then((json) => {
        fetchEvolutions(json.evolution_chain.url);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const fetchEvolutions = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setEvolutions(json.chain);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const fetchFlavourText = (id) => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then((response) => response.json())
      .then((json) => {
        const text = json.flavor_text_entries[1].flavor_text;
        const noSpecialChars = text.replace("", " ");
        setFlavourText(noSpecialChars);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const initialisePokemonCardData = () => {
    if (typesCount === 0) {
      setTypesCount(typesCount + 1);
      fetch(props.value.url)
        .then((response) => response.json())
        .then((json) => {
          setTypes(json.types);
          setPokemonID(json.id);
          setSprite(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
              json.id +
              ".gif"
          );
          setBasicSprite(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              json.id +
              ".png"
          );
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

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
          {evolutions.species.name.charAt(0).toUpperCase() +
            evolutions.species.name.slice(1)}
        </div>
        <div className="pokemon_Evolution_Arrow_Box">{" -> "} </div>
        <div className="pokemon_Evolution_Box">
          {evolutions.evolves_to[0].species.name.charAt(0).toUpperCase() +
            evolutions.evolves_to[0].species.name.slice(1)}
        </div>
        {evolutions.evolves_to[0].evolves_to.length === 1 ? (
          <div className="pokemon_Evolution_Arrow_Box">{" -> "} </div>
        ) : null}
        {evolutions.evolves_to[0].evolves_to.length === 1 ? (
          <div className="pokemon_Evolution_Box">
            {evolutions.evolves_to[0].evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
              evolutions.evolves_to[0].evolves_to[0].species.name.slice(1)}
          </div>
        ) : null}
      </div>
    );
  };

  const resetTypeList = () => {
    setUltraEffective([]);
    setSuperEffective([]);
    setNormalEffective([]);
    setNotEffective([]);
    setIneffective([]);
    setCalculated(false);

    calculateTypes();
  };

  const calculateTypes = () => {
    setCalculated(true);
    props.allTypes
      .slice(0, 18)
      .map((a_type, key) =>
        a_type.name === "shadow" ||
        a_type.name === "unknown" ||
        a_type.name === "colour"
          ? null
          : types[1] === undefined
          ? data[types[0].type.name][a_type.name] === 0
            ? setIneffective((inEffective) => [...inEffective, a_type.name])
            : data[types[0].type.name][a_type.name] === 0.5
            ? setNotEffective((notEffective) => [...notEffective, a_type.name])
            : data[types[0].type.name][a_type.name] === 1
            ? setNormalEffective((normalEffective) => [
                ...normalEffective,
                a_type.name,
              ])
            : data[types[0].type.name][a_type.name] === 2
            ? setSuperEffective((superEffective) => [
                ...superEffective,
                a_type.name,
              ])
            : null
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            0
          ? setIneffective((inEffective) => [...inEffective, a_type.name])
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            0.25
          ? setDoubleUneffective((doubleUneffective) => [
              ...doubleUneffective,
              a_type.name,
            ])
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            0.5
          ? setNotEffective((notEffective) => [...notEffective, a_type.name])
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            1
          ? setNormalEffective((normalEffective) => [
              ...normalEffective,
              a_type.name,
            ])
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            2
          ? setSuperEffective((superEffective) => [
              ...superEffective,
              a_type.name,
            ])
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            4
          ? setUltraEffective((ultraEffective) => [
              ...ultraEffective,
              a_type.name,
            ])
          : null
      );
  };

  const getPokemonData = (jStats) => {
    let statTotal = 0;
    {
      jStats.map((stat) => {
        statTotal += stat.base_stat;
      });
    }
    setStatTotal(statTotal);
    setVisible(!visible);
    setShow(true);
  };

  return (
    <div>
      {initialisePokemonCardData()}
      <div
        key={props.value.name}
        className="pokemonCard"
        onClick={fetchPokemonData}
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
        <img src={basicSprite}></img>
        <div className="pokemonCardName">
          {props.value.name.charAt(0).toUpperCase() + props.value.name.slice(1)}
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

      {visible && (
        <Offcanvas show={show} onHide={handleClose}>
          <span></span>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h2>
                #{pokemonID + " "}
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
              </h2>
            </Offcanvas.Title>
            {props.shinies.includes(pokemonName) ? (
              <div>
                <img src={shinySprite}></img> <img src={sprite}></img>
              </div>
            ) : (
              <img src={sprite}></img>
            )}
          </Offcanvas.Header>
          <div className="sidebar_pokemonCardTypes">
            {types.map((type) => (
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

          <Offcanvas.Body>
            <h4>Description</h4>
            <div>{flavourText != "" ? flavourText : <div>LOADING</div>}</div>

            <h4>Stats</h4>
            <div className="statContainer">
              {stats.map((stat, key) => (
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
                <div
                  className="statTitle"
                  style={{ backgroundColor: "#957DAD" }}
                >
                  TOT
                </div>
                <div className="statNumber">{total}</div>
              </div>
            </div>

            <div>
              <h4>Abilities</h4>
              <div className="abilityContainer">
                {abilities.map((ability, key) => (
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
                {pokemonHeight / 10 + "m"}
              </div>
              <div className="pokemon_height_weight_box" key="weight">
                {pokemonWeight / 10 + "kg"}
              </div>
            </div>

            <h4>Evolutions</h4>
            <div className="pokemon_Evolution_Container">
              {evolutions.length != 0 ? (
                evolutions.evolves_to.length === 1 ? (
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

            {console.log(calculated)}

            {console.log(superEffective)}
            <h4>Type Matchups</h4>
            <div className="typeMatchupsContainer">
              {ultraEffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"4x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
              {superEffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"2x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
              {normalEffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"1x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
              {notEffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"0.5x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
              {inEffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"0x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
              {doubleUneffective.map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type] }}
                  >
                    {"0.25x " + a_type}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </div>
  );
} // {evolutions.evolves_to.map((evolution,key) => <div key={key}>{evolution.evolves_to.name}</div>)}
// a bug that kept changing the type to second type when only trying to use the first type
/* (evolutionDetails.map( (detail) => <div> {evolutions.evolves_to[0].evolution_details[0][detail] === "null" ? "" : evolutions.evolves_to[0].evolution_details[0][detail] }</div> )): "")

<div>{(evolutions.evolves_to.length === 1 ? evolutions.species.name + 
    (evolutions.evolves_to.length === 1 ? " -> " + <img src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'+pokemonData.id+1+'.gif'/> : "" ) +
    (evolutions.evolves_to[0].evolves_to.length === 1 ? " -> " + 
      evolutions.evolves_to[0].evolves_to[0].species.name : "") : "This pokemon has no evolutions in generations 1-5")}  
  </div> 

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








      <div className='pokemonCardTypes'>
        {types.map(
        (type) => <div className='pokemonType' style={{backgroundColor:typeColours[type.type.name]}}>
          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1) + " "}
          </div>
       )}
       </div>




         <h4>Type Matchups</h4>
            <div className="typeMatchupsContainer">
              {props.allTypes.slice(0, 18).map(
                (a_type, key) => (
                  <div
                    key={key}
                    className="typeMatchup"
                    style={{ backgroundColor: typeColours[a_type.name] }}
                  >
                    {a_type.name === "shadow" ||
                    a_type.name === "unknown" ||
                    a_type.name === "colour" ? null : types[1] === undefined ? (
                      <div>
                        {data[types[0].type.name][a_type.name] +
                          "x " +
                          a_type.name}
                      </div>
                    ) : (
                      <div>
                        {data[types[0].type.name][a_type.name] *
                          data[types[1].type.name][a_type.name] +
                          "x " +
                          a_type.name}
                      </div>
                    )}
                  </div>
                ) // use arrays to split the data by adding them to "2x, 1/2x, 0x, 4x" arrays and sorting them
              )}
            </div>



            const calculateTypes = () => {
    setCalculated(true);
    props.allTypes
      .slice(0, 18)
      .map((a_type, key) =>
        a_type.name === "shadow" ||
        a_type.name === "unknown" ||
        a_type.name === "colour"
          ? null
          : types[1] === undefined
          ? data[types[0].type.name][a_type.name] === 0.5
            ? notEffective.push(a_type.name)
            : data[types[0].type.name][a_type.name] === 1
            ? normalEffective.push(a_type.name)
            : data[types[0].type.name][a_type.name] === 2
            ? superEffective.push(a_type.name)
            : null
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            0.5
          ? notEffective.push(a_type.name)
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            1
          ? normalEffective.push(a_type.name)
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            2
          ? superEffective.push(a_type.name)
          : data[types[0].type.name][a_type.name] *
              data[types[1].type.name][a_type.name] ===
            4
          ? ultraEffective.push(a_type.name)
          : null
      );
  };

*/

export default PokemonCard;
