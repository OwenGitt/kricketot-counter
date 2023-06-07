import React from "react";
import "../styleSheets/AboutStyles.css";
import hunts from "../jsonData/hunts.json";

function AboutPage() {
  const allHunts = hunts["hunts"].map((value, index) => (
    <section key={value} className="pokemonCardSection">
      {console.log(value["Encounters"])}
    </section>
  ));

  return (
    <div className="aboutPageContainer">
      <div className="aboutCardContainer"></div>
    </div>
  );
}
export default AboutPage;
