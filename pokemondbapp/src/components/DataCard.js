/**
 * DataCard
 *
 * This function assigns a row and column value to every PokemonCard.
 * The PokemonCard function is then called.
 *
 * @author Owen Gittins
 */
import PokemonCard from "./PokemonCard";
import "./styleSheets/pokemonPageStyles.css";

function DataCard(props) {
  return (
    <div className="row">
      <div className="column">
        <PokemonCard
          value={props.value}
          allTypes={props.allTypes}
          id={props.id}
          key={props.value.name}
          fetchPokemonData={props.fetchPokemonData}
          generation={props.generation}
        />
      </div>
    </div>
  );
}
export default DataCard;
