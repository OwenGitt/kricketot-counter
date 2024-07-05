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
    min_affection: "Affec.",
    min_beauty: "Beauty",
    min_happiness: "Lv.Up, Hap.",
    min_level: "Lv.",
    needs_overworld_rain: "Raining",
    party_species: "Lvl up with",
    party_type: "Party Type",
    relative_physical_stats: "Stat",
    time_of_day: "Time",
    trade_species: "Trade Spec.",
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
    props.evolutionDetails.trigger.name === "trade"
      ? setToReturn("Trade")
      : methodsToCheck.map((method, index) =>
          props.evolutionDetails[method] !== "" &&
          props.evolutionDetails[method] !== null &&
          props.evolutionDetails[method] !== false
            ? method === "known_move" ||
              method === "location" ||
              method === "known_move_type"
              ? setToReturn(
                  dict[method] +
                    " " +
                    props.evolutionDetails[method].name
                      .charAt(0)
                      .toUpperCase() +
                    props.evolutionDetails[method].name.slice(1)
                )
              : method === "party_species"
              ? setToReturn(
                  dict[method] +
                    " " +
                    props.evolutionDetails[method].name
                      .charAt(0)
                      .toUpperCase() +
                    props.evolutionDetails[method].name.slice(1) +
                    " in party"
                )
              : setToReturn(dict[method] + props.evolutionDetails[method])
            : null
        );
  }, [props.evolutionDetails]);
  return <div className="pokemon_Evolution_Method_Box">{toReturn}</div>;
}
export default CheckEvolution;
