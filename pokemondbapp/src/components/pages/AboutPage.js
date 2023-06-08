import React from "react";
import "../styleSheets/AboutStyles.css";
import hunts from "../jsonData/hunts.json";
import HuntCard from "../HuntCard";

function AboutPage() {
  const allHunts = hunts["hunts"].map((value, index) => (
    <section key={index} className="huntCardSection">
      <div className="aboutRow">
        <div className="aboutColumn">
          <HuntCard value={value} />
        </div>
      </div>
    </section>
  ));

  return (
    <div className="aboutPageContainer">
      <div className="aboutCardContainer">{allHunts}</div>
    </div>
  );
}
export default AboutPage;
