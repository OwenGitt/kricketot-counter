import React, { useState } from "react";
import "../styleSheets/HuntsPageStyles.css";
import hunts from "../json_data/hunts.json";
import HuntCard from "../HuntCard";

function HuntsPage() {
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [shinies, setShinies] = useState([]);
  const [totalEncounters, setTotalEncounters] = useState("");
  const [generation, setGeneration] = useState("");
  const [location, setLocation] = useState("");
  const [spriteURL, setSpriteURL] = useState("");

  const allHunts = hunts["hunts"].map((value, index) => (
    <section key={index} className="huntCardSection">
      <HuntCard value={value} passHuntData={passHuntData} />
    </section>
  ));

  function passHuntData(
    huntName,
    target,
    shinies,
    total_encounters,
    generation,
    location,
    spriteURL
  ) {
    setName(huntName);
    setTarget(target);
    setShinies(shinies);
    setTotalEncounters(total_encounters);
    setGeneration(generation);
    setLocation(location);
    setMoreInfoVisible(!moreInfoVisible);
    setSpriteURL(spriteURL);
  }

  return (
    <div className="huntsPageContainer">
      <div className="huntsCardContainer">{allHunts}</div>

      <div
        className="moreInfoHuntCard"
        onClick={() => setMoreInfoVisible(false)}
        style={{
          opacity: moreInfoVisible === true ? "1" : "0",
          visibility: moreInfoVisible === true ? "visible" : "hidden",
        }}
      >
        <span className="closeButton">&#10005;</span>
        <h1 className="moreInfoTitle">{name}</h1>
        <p className="locationText">
          Generation {generation}, {location}
        </p>
        <h2 className="targetTitle">Target </h2>
        <p className="targetText">
          {target.charAt(0).toUpperCase() + target.slice(1)}
        </p>
        <img src={spriteURL} />
        <h3 className="totalEncounterTitle">Total Encounters </h3>
        <p className="totalEncountersText">{totalEncounters}</p>

        <h3 className="shinyEncounterTitle">Shiny Encounters</h3>
        <div className="shinyGrid">
          {shinies.map((shiny, index) => (
            <div className="shinyGridItem">
              <div className="shinyEncounterName">
                {shiny.Name.charAt(0).toUpperCase() + shiny.Name.slice(1)}
                <p className="shinyEncounters">{shiny.Encounters}</p>
              </div>
              <div className="imgContainer">
                <img
                  className="shinyEncounterImg"
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/" +
                    shiny.ID +
                    ".gif"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HuntsPage;
