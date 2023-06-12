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
    location
  ) {
    setName(huntName);
    setTarget(target);
    setShinies(shinies);
    setTotalEncounters(total_encounters);
    setGeneration(generation);
    setLocation(location);
    setMoreInfoVisible(!moreInfoVisible);
  }

  return (
    <div className="aboutPageContainer">
      <div className="aboutCardContainer">{allHunts}</div>
      {moreInfoVisible === true && (
        <div
          className="moreInfoHuntCard"
          onClick={() => setMoreInfoVisible(false)}
        >
          <h1>{name}</h1>
          <p>{target}</p>
          <p>{totalEncounters}</p>
          <p>{location}</p>
        </div>
      )}
    </div>
  );
}
export default AboutPage;
