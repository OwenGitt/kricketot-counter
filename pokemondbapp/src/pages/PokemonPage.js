import React, { useState, useEffect } from "react";
import DataCard from "../components/cards/DataCard";
import Search from "../components/navigation/Search";
import "../styleSheets/pokemonPageStyles.css";
import Sidebar from "../components/sidebar/Sidebar";
import data from "../json_data/types.json";
import fairyPokemon from "../json_data/fairyPokemon.json";

function PokemonPage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [UpperLimit, setUpper] = useState(100);
  const [LowerLimit, setLower] = useState(0);
  const [backVisible, setBackVisible] = useState(false);
  const [nextVisible, setNextVisible] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pokemonID, setPokemonID] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [abilities, setAbilites] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [sprite, setSprite] = useState("");
  const [shinySprite, setSpriteShiny] = useState("");
  const [total, setStatTotal] = useState(0);
  const [evolutions, setEvolutions] = useState([]);
  const [flavourText, setFlavourText] = useState("");
  const [notEffective, setNotEffective] = useState([]);
  const [normalEffective, setNormalEffective] = useState([]);
  const [superEffective, setSuperEffective] = useState([]);
  const [ultraEffective, setUltraEffective] = useState([]);
  const [inEffective, setIneffective] = useState([]);
  const [doubleUneffective, setDoubleUneffective] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarClosing, setSidebarClosing] = useState(false);
  const [generation, setGeneration] = useState("generation-v");
  const [generationTotals] = useState({
    "generation-i": 151,
    "generation-ii": 251,
    "generation-iii": 386,
    "generation-iv": 493,
    "generation-v": 649,
  });
  const [generationPokemon, setGenerationPokemon] = useState([]);
  const [generationSelectOptions] = useState([
    "Generation 1",
    "Generation 2",
    "Generation 3",
    "Generation 4",
    "Generation 5",
  ]);
  const [generationSelectValues] = useState({
    "Generation 1": "generation-i",
    "Generation 2": "generation-ii",
    "Generation 3": "generation-iii",
    "Generation 4": "generation-iv",
    "Generation 5": "generation-v",
  });
  const isMobile = width <= 768;
  const handleSidebarClose = () => {
    setSidebarVisible(false);
    setSidebarClosing(false);
  };
  const handleSearchClear = () => setSearchTerm("");

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function fetchPokemonData(pokemonURL) {
    fetch(pokemonURL)
      .then((response) => response.json())
      .then((json) => {
        if (fairyPokemon[json.name]) {
          setTypes(fairyPokemon[json.name]);
        } else {
          setTypes(json.types);
        }
        setPokemonID(json.id);
        setSprite(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
            json.id +
            ".gif",
        );
        setPokemonName(json.name);
        setPokemonHeight(json.height);
        setPokemonWeight(json.weight);
        setAbilites(json.abilities);
        setStats(json.stats);
        setSpriteShiny(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/" +
            json.id +
            ".gif",
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

  const allPokemon = generationPokemon
    .filter(searchPokemon)
    .slice(LowerLimit, UpperLimit)
    .map((value, index) => (
      <section key={value.name} className="pokemonCardSection">
        <DataCard
          value={value}
          allTypes={props.allTypes}
          id={index + 1}
          key={value.name}
          fetchPokemonData={fetchPokemonData}
          generation={generation}
        />
      </section>
    ));

  useEffect(() => {
    setGenerationPokemon(props.pokemon.slice(0, generationTotals[generation]));
  }, [generation, generationTotals, props.pokemon]);

  useEffect(() => {
    const filterBySearch = (value) => {
      const pokemonName = value.name;
      return pokemonName.toLowerCase().includes(searchTerm.toLowerCase());
    };

    if (searchTerm) {
      setNextVisible(
        generationPokemon.filter(filterBySearch).length >= UpperLimit,
      );
    }
    if (generationPokemon.filter(filterBySearch).length < UpperLimit - 100) {
      setBackVisible(false);
      setNextVisible(true);
      setUpper(100);
      setLower(0);
      setPageNum(0);
    }
  }, [UpperLimit, generationPokemon, searchTerm]);

  const showMorePokemon = () => {
    setPageNum(pageNum + 1);
    setUpper(UpperLimit + 100);
    setLower(LowerLimit + 100);
    setBackVisible(true);
    if (UpperLimit + 100 > generationPokemon.filter(searchPokemon).length) {
      setNextVisible(false);
    }
  };

  const showLessPokemon = () => {
    setUpper(UpperLimit - 100);
    setLower(LowerLimit - 100);
    setPageNum(pageNum - 1);
    setNextVisible(true);
    if (LowerLimit === 100) {
      setBackVisible(false);
    }
  };

  const maxLimit = () => {
    setUpper(UpperLimit);
    setLower(LowerLimit);
    setNextVisible(false);
  };

  const lowLimit = () => {
    setUpper(UpperLimit);
    setLower(LowerLimit);
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
        console.log("fetchEvolutionChain() -> ".e.message);
      });
  };

  const fetchEvolutions = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setEvolutions(json.chain);
      })
      .catch((e) => {
        console.log("fetchEvolutions() -> ".e.message);
      });
  };

  const fetchFlavourText = (id) => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then((response) => response.json())
      .then((json) => {
        let enEntry = json.flavor_text_entries.find(
          (key) => key.language.name === "en",
        );

        const text = enEntry.flavor_text;
        const noSpecialChars = text.replace("", " ");
        setFlavourText(noSpecialChars);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const getPokemonData = (jStats) => {
    let statTotal = 0;
    jStats.forEach((stat) => {
      statTotal += stat.base_stat;
    });

    setStatTotal(statTotal);
    setSidebarVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setNotEffective([]);
      setNormalEffective([]);
      setSuperEffective([]);
      setUltraEffective([]);
      setIneffective([]);
      setDoubleUneffective([]);
      setTimeout(() => {
        props.allTypes.slice(0, 18).forEach((a_type, key) => {
          if (
            a_type.name === "shadow" ||
            a_type.name === "unknown" ||
            a_type.name === "colour" ||
            a_type.name === "fairy"
          ) {
            // Do nothing
          } else if (types.length === 1) {
            if (data[types[0].type.name][a_type.name] === 0) {
              setIneffective((inEffective) => [...inEffective, a_type.name]);
            } else if (data[types[0].type.name][a_type.name] === 0.5) {
              setNotEffective((notEffective) => [...notEffective, a_type.name]);
            } else if (data[types[0].type.name][a_type.name] === 1) {
              setNormalEffective((normalEffective) => [
                ...normalEffective,
                a_type.name,
              ]);
            } else if (data[types[0].type.name][a_type.name] === 2) {
              setSuperEffective((superEffective) => [
                ...superEffective,
                a_type.name,
              ]);
            }
          } else {
            if (
              data[types[0].type.name][a_type.name] *
                data[types[1].type.name][a_type.name] ===
              0
            ) {
              setIneffective((inEffective) => [...inEffective, a_type.name]);
            } else if (
              data[types[0].type.name][a_type.name] *
                data[types[1].type.name][a_type.name] ===
              0.25
            ) {
              setDoubleUneffective((doubleUneffective) => [
                ...doubleUneffective,
                a_type.name,
              ]);
            } else if (
              data[types[0].type.name][a_type.name] *
                data[types[1].type.name][a_type.name] ===
              0.5
            ) {
              setNotEffective((notEffective) => [...notEffective, a_type.name]);
            } else if (
              data[types[0].type.name][a_type.name] *
                data[types[1].type.name][a_type.name] ===
              1
            ) {
              setNormalEffective((normalEffective) => [
                ...normalEffective,
                a_type.name,
              ]);
            } else if (
              data[types[0].type.name][a_type.name] *
                data[types[1].type.name][a_type.name] ===
              2
            ) {
              setSuperEffective((superEffective) => [
                ...superEffective,
                a_type.name,
              ]);
            } else if (
              setUltraEffective((ultraEffective) => [
                ...ultraEffective,
                a_type.name,
              ])
            ) {
              setUltraEffective((ultraEffective) => [
                ...ultraEffective,
                a_type.name,
              ]);
            }
          }
        });
      }, 100);
    }, 200);
  }, [pokemonID, props.allTypes, types]);

  const onOptionChangeHandler = (event) => {
    if (event.target.value === "Select Sprite Generation") {
      setGeneration(generationSelectValues["Generation 5"]);
    } else {
      setGeneration(generationSelectValues[event.target.value]);
    }
  };

  return (
    <main className="pageContainer">
      <div className="pokemonPageTop">
        <Search
          searchTerm={searchTerm}
          handler={searchHandler}
          default={"Search for a Pokémon"}
          handleSearchClear={handleSearchClear}
        />

        <select onChange={onOptionChangeHandler} className="generationFilter">
          <option>Select Sprite Generation</option>
          {generationSelectOptions.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>

      <section className="mainSectionWrapper">
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
          visible={sidebarVisible}
          handleSidebarClose={handleSidebarClose}
          fetchData={fetchPokemonData}
          isMobile={isMobile}
          abilityDataVisible={false}
          generation={generation}
          sidebarClosing={sidebarClosing}
          setSidebarClosing={setSidebarClosing}
        />

        <div
          className="cardbuttonContainer"
          style={{
            display: isMobile && sidebarVisible ? "none" : "flex",
          }}
        >
          <div
            className="pageButtons"
            style={{
              margin: sidebarVisible ? "0" : "0 auto",
            }}
          >
            {backVisible && (
              <button
                onClick={LowerLimit === 0 ? lowLimit : showLessPokemon}
                className="nextBackButtons"
              >
                Back
              </button>
            )}
            {nextVisible && (
              <button
                onClick={
                  UpperLimit > props.pokemon.length ? maxLimit : showMorePokemon
                }
                className="nextBackButtons"
              >
                Next
              </button>
            )}
          </div>

          <div
            className="cardContainer"
            style={{
              margin: sidebarVisible ? "0" : "0 auto",
            }}
          >
            {allPokemon}
          </div>

          <div
            className="pageButtons"
            style={{
              margin: sidebarVisible ? "0" : "0 auto",
            }}
          >
            {backVisible && (
              <button
                variant="dark"
                onClick={LowerLimit === 0 ? lowLimit : showLessPokemon}
                className="nextBackButtons"
              >
                Back
              </button>
            )}
            {nextVisible && (
              <button
                variant="dark"
                onClick={
                  UpperLimit > props.pokemon.length ? maxLimit : showMorePokemon
                }
                className="nextBackButtons"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default PokemonPage;
