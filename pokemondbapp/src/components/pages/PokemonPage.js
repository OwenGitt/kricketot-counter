import React, { useState, useEffect } from "react";
import DataCard from "../DataCard";
import Search from "../Search";
import "../styleSheets/pokemonPageStyles.css";
import Sidebar from "../Sidebar";
import data from "../jsonData/types.json";

/**
 *
 *
 *
 * @author Owen Gittins
 */
function PokemonPage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  //Turn into JSON file at some point
  const [shinySprites] = useState([
    "totodile",
    "croconaw",
    "feraligatr",
    "hoothoot",
    "noctowl",
    "moltres",
    "zubat",
    "sandshrew",
    "sandslash",
    "stantler",
    "shroomish",
    "dratini",
    "dragonair",
    "dragonite",
    "venonat",
    "golbat",
    "delibird",
    "rhyhorn",
    "zapdos",
    "lugia",
    "ho-oh",
    "dunsparce",
    "psyduck",
    "lillipup",
    "herdier",
    "azurill",
    "marill",
    "azumarill",
    "growlithe",
  ]);
  const [UpperLimit, setUpper] = useState(100);
  const [LowerLimit, setLower] = useState(0);
  const [backVisible, setBackVisible] = useState(false);
  const [nextVisible, setNextVisible] = useState(true);
  const [pageNum, setPageNum] = useState(1);

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

  const handleClose = () => setShow(false);

  useEffect(() => {
    setTimeout(() => {
      setNotEffective([]);
      setNormalEffective([]);
      setSuperEffective([]);
      setUltraEffective([]);
      setIneffective([]);
      setDoubleUneffective([]);
      setTimeout(() => {
        resetTypeList();
      }, 100);
    }, 200);
  }, [pokemonID]);

  function fetchPokemonData(pokemonURL) {
    fetch(pokemonURL)
      .then((response) => response.json())
      .then((json) => {
        console.log(superEffective);
        setTypes(json.types);
        setPokemonID(json.id);
        setSprite(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
            json.id +
            ".gif"
        );
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  const searchPokemon = (value) => {
    const pokemonName = value.name;
    return pokemonName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const searchHandler = (event) => {
    setSearchTerm(event);
  };
  const allPokemon = props.pokemon
    .filter(searchPokemon)
    .slice(LowerLimit, UpperLimit)
    .map((value, index) => (
      <section key={value.name} className="pokemonCardSection">
        <DataCard
          value={value}
          shinies={shinySprites}
          allTypes={props.allTypes}
          id={index + 1}
          key={value.name}
          fetchPokemonData={fetchPokemonData}
        />
      </section>
    ));

  const showMorePapers = () => {
    setPageNum(pageNum + 1);
    setUpper(UpperLimit + 100);
    setLower(LowerLimit + 100);
    setBackVisible(true);
    if (UpperLimit === 600) {
      console.log(UpperLimit);
      setNextVisible(false);
    }
  };

  const showLessPapers = () => {
    setUpper(UpperLimit - 100);
    setLower(LowerLimit - 100);
    setPageNum(pageNum - 1);
    setNextVisible(true);
    if (LowerLimit === 100) {
      setBackVisible(false);
    }
  };

  const maxLimit = () => {
    setUpper(UpperLimit + 0);
    setLower(LowerLimit + 0);
    setNextVisible(false);
  };

  const lowLimit = () => {
    setUpper(UpperLimit + 0);
    setLower(LowerLimit + 0);
    setBackVisible(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [UpperLimit, LowerLimit]);

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

  const getPokemonData = (jStats) => {
    let statTotal = 0;
    {
      jStats.map((stat) => {
        statTotal += stat.base_stat;
      });
    }
    setStatTotal(statTotal);
    setVisible(true);
    setShow(true);
  };

  const resetTypeList = () => {
    calculateTypes();
  };

  const calculateTypes = () => {
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

  return (
    <div className="pageContainer">
      <div>
        <Search
          searchTerm={searchTerm}
          handler={searchHandler}
          default={"Search for a Pokémon"}
        />
        <div className="pageButtonsContainer">
          {backVisible && (
            <button
              variant="dark"
              onClick={LowerLimit === 0 ? lowLimit : showLessPapers}
              style={{ margin: "20px" }}
              className="pageButtons"
            >
              Back
            </button>
          )}
          {nextVisible && (
            <button
              variant="dark"
              onClick={
                UpperLimit > props.pokemon.length ? maxLimit : showMorePapers
              }
              style={{ margin: "20px" }}
              className="pageButtons"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="pokemonListAndDataContainer">
        {visible && (
          <Sidebar
            pokemonID={pokemonID}
            pokemonName={pokemonName}
            pokemonWeight={pokemonWeight}
            pokemonHeight={pokemonHeight}
            abilities={abilities}
            types={types}
            stats={stats}
            sprite={sprite}
            shinySprite={shinySprite}
            total={total}
            evolutions={evolutions}
            flavourText={flavourText}
            notEffective={notEffective}
            normalEffective={normalEffective}
            superEffective={superEffective}
            ultraEffective={ultraEffective}
            inEffective={inEffective}
            doubleUneffective={doubleUneffective}
            shinies={shinySprites}
            handleClose={handleClose}
            show={props.show}
          />
        )}
        <div className="cardContainer">{allPokemon}</div>
      </div>
      <div className="pageButtonsContainer">
        {backVisible && (
          <button
            variant="dark"
            onClick={LowerLimit === 0 ? lowLimit : showLessPapers}
            style={{ margin: "20px" }}
            className="pageButtons"
          >
            Back
          </button>
        )}
        {nextVisible && (
          <button
            variant="dark"
            onClick={
              UpperLimit > props.pokemon.length ? maxLimit : showMorePapers
            }
            style={{ margin: "20px" }}
            className="pageButtons"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default PokemonPage;
