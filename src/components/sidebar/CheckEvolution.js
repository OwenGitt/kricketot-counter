import { useEffect, useState } from "react";
import EvolutionItem from "./EvolutionItem";
import { formatEvolutionReqs } from "../../textReplacer.tsx";

function CheckEvolution(props) {
  const [toReturn, setToReturn] = useState(<></>);

  useEffect(() => {
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
                  "Level up holding " + props.evolutionDetails.held_item.name
                }
                url={props.evolutionDetails.held_item.url}
              />,
            );
          } else {
            evolutionDetails.push(
              <EvolutionItem
                key={method}
                method={"Trade"}
                url={props.evolutionDetails.held_item.url}
              />,
            );
          }
        } else if (method === "item") {
          evolutionDetails.push(
            <EvolutionItem
              key={method}
              method={"Use"}
              url={props.evolutionDetails.item.url}
            />,
          );
        } else if (
          method === "known_move" ||
          method === "location" ||
          method === "known_move_type" ||
          method === "party_species"
        ) {
          evolutionDetails.push(
            formatEvolutionReqs(
              dict[method] + props.evolutionDetails[method].name,
            ),
          );
        } else if (method === "party_species") {
          evolutionDetails.push(
            formatEvolutionReqs(
              dict[method] +
                " " +
                props.evolutionDetails[method].name +
                " in party",
            ),
          );
        } else if (method === "time_of_day") {
          evolutionDetails.push(
            formatEvolutionReqs("at " + props.evolutionDetails[method]),
          );
        } else if (method === "min_happiness") {
          evolutionDetails.push(
            formatEvolutionReqs(
              dict[method] + " (" + props.evolutionDetails[method] + ")",
            ),
          );
        } else {
          evolutionDetails.push(
            formatEvolutionReqs(dict[method] + props.evolutionDetails[method]),
          );
        }
      }
    });

    if (
      props.evolutionDetails.trigger.name === "trade" &&
      evolutionDetails.length === 0
    ) {
      evolutionDetails.push(formatEvolutionReqs("trade"));
    }

    if (
      props.evolutionDetails.trigger.name === "shed" &&
      evolutionDetails.length === 0
    ) {
      evolutionDetails.push(
        formatEvolutionReqs("poké Ball in bag and space in party"),
      );
    }

    if (evolutionDetails.length === 2) {
      if (typeof evolutionDetails[1] === "string") {
        if (
          evolutionDetails[1].includes("day") ||
          evolutionDetails[1].includes("night")
        ) {
          evolutionDetails[1] = " " + evolutionDetails[1];
        } else if (
          evolutionDetails[0].includes("female") ||
          evolutionDetails[0].includes("male")
        ) {
          let temp = evolutionDetails[0];
          evolutionDetails[0] = evolutionDetails[1];
          evolutionDetails[1] = temp;
          evolutionDetails[1] = " (" + evolutionDetails[1] + ")";
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
