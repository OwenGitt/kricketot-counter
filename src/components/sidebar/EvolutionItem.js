import { useState } from "react";
import { formatEvolutionReqs } from "../../textReplacer.ts";

function EvolutionItem(props) {
  const [itemSprite, setItemSprite] = useState("");

  fetch(props.url)
    .then((response) => response.json())
    .then((json) => {
      setItemSprite(json.sprites.default);
    })
    .catch((e) => {
      console.log(e.message);
    });

  return (
    <div className="pokemon_Inner_Evolution_Method_Box">
      <img alt={props.method} src={itemSprite}></img>
      {formatEvolutionReqs(props.method)}
    </div>
  );
}
export default EvolutionItem;
