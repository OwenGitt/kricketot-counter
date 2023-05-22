import React, { useState, useEffect } from "react";
import DataCard from "../DataCard";
import Search from "../Search";
import "../styleSheets/pokemonPageStyles.css";

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
  ]);
  const [UpperLimit, setUpper] = useState(100);
  const [LowerLimit, setLower] = useState(0);
  const [backVisible, setBackVisible] = useState(false);
  const [nextVisible, setNextVisible] = useState(true);
  const [pageNum, setPageNum] = useState(1);

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

  return (
    <div className="pageContainer">
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
      <div className="cardContainer">{allPokemon}</div>
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
