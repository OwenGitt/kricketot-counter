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
    location: "Level up at ",
    min_affection: "Affec. ",
    min_beauty: "Beauty ",
    min_happiness: "Level up with high happiness ",
    min_level: "Lv. ",
    needs_overworld_rain: "Raining ",
    party_species: "Level up with ",
    party_type: "Party type ",
    relative_physical_stats: "Stat ",
    time_of_day: "time",
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

  useEffect(() => {
    const evolutionDetails = [];

    methodsToCheck.forEach((method) => {
      if (
        props.evolutionDetails[method] !== null &&
        props.evolutionDetails[method] !== false &&
        props.evolutionDetails[method] !== ""
      ) {
        if (method === "held_item") {
          if (props.evolutionDetails.trigger.name === "level-up") {
            evolutionDetails.push(
              <EvolutionItem
                key={method}
                method={
                  "Level up holding " +
                  props.evolutionDetails.held_item.name.replace("-", " ")
                }
                url={props.evolutionDetails.held_item.url}
              />
            );
          } else {
            evolutionDetails.push(
              <EvolutionItem
                key={method}
                method={"Trade"}
                url={props.evolutionDetails.held_item.url}
              />
            );
          }
        } else if (method === "item") {
          evolutionDetails.push(
            <EvolutionItem
              key={method}
              method={"Use"}
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
                props.evolutionDetails[method].name.slice(1).replace("-", " ")
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
        } else if (method === "time_of_day") {
          evolutionDetails.push(
            replaceText("at " + props.evolutionDetails[method])
          );
        } else if (method === "min_happiness") {
          evolutionDetails.push(
            replaceText(
              dict[method] + " (" + props.evolutionDetails[method] + ")"
            )
          );
        } else {
          evolutionDetails.push(
            replaceText(dict[method] + props.evolutionDetails[method])
          );
        }
      }
    });

    if (
      props.evolutionDetails.trigger.name === "trade" &&
      evolutionDetails.length === 0
    ) {
      evolutionDetails.push(replaceText("Trade"));
    }

    if (
      props.evolutionDetails.trigger.name === "shed" &&
      evolutionDetails.length === 0
    ) {
      evolutionDetails.push(replaceText("Poké Ball in bag and space in party"));
    }

    if (evolutionDetails.length === 2) {
      if (typeof evolutionDetails[1] === "string") {
        if (
          evolutionDetails[1].includes("day") ||
          evolutionDetails[1].includes("night")
        ) {
          evolutionDetails[1] = " " + evolutionDetails[1];
        } else {
          evolutionDetails[1] = " + " + evolutionDetails[1];
        }
      } else {
        evolutionDetails[0] = evolutionDetails[0] + " + ";
      }
    }

    setToReturn(evolutionDetails);
  }, [props.evolutionDetails]);
  return <div className="pokemon_Evolution_Method_Box">{toReturn}</div>;
}
export default CheckEvolution;
