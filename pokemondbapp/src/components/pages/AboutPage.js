import React, { useState } from "react";
import "../styleSheets/AboutStyles.css";
import hunts from "../jsonData/hunts.json";
import HuntCard from "../HuntCard";

function AboutPage() {
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
      <div className="aboutRow">
        <div className="aboutColumn">
          <HuntCard value={value} passHuntData={passHuntData} />
        </div>
      </div>
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
    <div className="aboutPageContainer">
      <div className="aboutCardContainer">{allHunts}</div>
      {moreInfoVisible === true && (
        <div
          className="moreInfoHuntCard"
          onClick={() => setMoreInfoVisible(false)}
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
      )}
    </div>
  );
}
export default AboutPage;
