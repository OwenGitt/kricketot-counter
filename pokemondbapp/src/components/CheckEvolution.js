import { useEffect, useState } from "react";

function CheckEvolution(props) {
  const [toReturn, setToReturn] = useState("");

  const dict = {
    gender: "Gender",
    held_item: "Trade",
    item: null,
    known_move: "Learn",
    known_move_type: "Learn type",
    location: "Loc.",
    min_affection: "Affec. ",
    min_beauty: "Beauty ",
    min_happiness: "Lv.Up, Hap. ",
    min_level: "Lv.",
    needs_overworld_rain: "Raining",
    party_species: "Party Spec.",
    party_type: "Party Type ",
    relative_physical_stats: "Stat ",
    time_of_day: "Time ",
    trade_species: "Trade Spec. ",
  };

  const methodsToCheck = [
    "gender",
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
    "trade_species",
  ];

  useEffect(() => {
    methodsToCheck.map((method, index) =>
      props.evolutionDetails[method] !== "" &&
      props.evolutionDetails[method] !== null &&
      props.evolutionDetails[method] !== false
        ? setToReturn(dict[method] + props.evolutionDetails[method])
        : null
    );
  }, [props.evolutionDetails]);
  return <div>{toReturn}</div>;
}
export default CheckEvolution;
