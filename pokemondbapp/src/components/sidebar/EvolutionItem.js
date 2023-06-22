import { useEffect, useState } from "react";

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
    <div>
      <img src={itemSprite}></img>
      {props.method}
    </div>
  );
}
export default EvolutionItem;
