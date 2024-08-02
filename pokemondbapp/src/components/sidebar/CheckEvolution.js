import { useEffect, useState } from "react";
import EvolutionItem from "./EvolutionItem";

function CheckEvolution(props) {
  const [toReturn, setToReturn] = useState(<></>);

  const replaceText = (text) => {
    // Sort out text for certain evolutions
    return text
      .replace("Stat 1", "Lvl 20 & Atk > Def")
      .replace("Stat -1", "Lvl 20 & Atk < Def")
      .replace("Stat 0", "Lvl 20 & Atk = Def")
      .replace("Loc. Eterna-forest", "Lvl up near Moss Rock")
      .replace("Loc. Sinnoh-route-217", "Lvl up near Ice Rock")
      .replace("Gender 1", "Female")
      .replace("Gender 2", "Male");
  };

  const dict = {
    gender: "Gender ",
    held_item: "Trade ",
    item: "",
    known_move: "Learn ",
    known_move_type: "Learn type ",
    location: "Lvl up at ",
    min_affection: "Affec. ",
    min_beauty: "Beauty ",
    min_happiness: "Lvl up with happiness ",
    min_level: "Lv. ",
    needs_overworld_rain: "Raining ",
    party_species: "Lvl up with ",
    party_type: "Party type ",
    relative_physical_stats: "Stat ",
    time_of_day: "Time ",
    trade_species: "Trade spec. ",
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

  console.log(props.evolutionDetails);

  useEffect(() => {
    const evolutionDetails = [];

    methodsToCheck.forEach((method) => {
      if (
        props.evolutionDetails[method] !== null &&
        props.evolutionDetails[method] !== false &&
        props.evolutionDetails[method] !== ""
      ) {
        if (method === "trade") {
          evolutionDetails.push(
            <EvolutionItem
              key={method}
              method={"Trade"}
              url={props.evolutionDetails.held_item.url}
            />
          );
        } else if (method === "item") {
          evolutionDetails.push(
            <EvolutionItem
              key={method}
              method={""}
              url={props.evolutionDetails.item.url}
            />
          );
        } else if (
          method === "known_move" ||
          method === "location" ||
          method === "known_move_type" ||
          method === "party_species"
        ) {
          evolutionDetails.push(
            replaceText(
              dict[method] +
                " " +
                props.evolutionDetails[method].name.charAt(0).toUpperCase() +
                props.evolutionDetails[method].name.slice(1)
            )
          );
        } else if (method === "party_species") {
          evolutionDetails.push(
            replaceText(
              dict[method] +
                " " +
                props.evolutionDetails[method].name.charAt(0).toUpperCase() +
                props.evolutionDetails[method].name.slice(1) +
                " in party"
            )
          );
        } else {
          evolutionDetails.push(
            replaceText(dict[method] + props.evolutionDetails[method])
          );
        }
      }
    });

    if (evolutionDetails.length === 2) {
      evolutionDetails[0] = evolutionDetails[0] + " + ";
    }

    setToReturn(evolutionDetails);
  }, [props.evolutionDetails]);
  return <div className="pokemon_Evolution_Method_Box">{toReturn}</div>;
}
export default CheckEvolution;
