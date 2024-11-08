import CheckEvolution from "./CheckEvolution";
import { formatPokemonNames } from "../../textReplacer.tsx";

function Evolutions(props) {
  const renderEvolutionMethod = (evolutionDetails) => {
    if (evolutionDetails !== null && evolutionDetails !== undefined) {
      return <CheckEvolution evolutionDetails={evolutionDetails} />;
    } else if (evolutionDetails !== null) {
      return (
        <div className="pokemon_Evolution_Method_Box">
          {"← Breed with Ditto"}
        </div>
      );
    }
  };

  const renderEvolutionBox = (evolvesTo) => {
    if (evolvesTo !== null) {
      return (
        <div
          className="pokemon_Evolution_Box"
          onClick={() =>
            props.fetchData(
              "https://pokeapi.co/api/v2/pokemon/" + evolvesTo.species.name,
            )
          }
        >
          {formatPokemonNames(evolvesTo.species.name)}
        </div>
      );
    }
  };

  const renderSplitEvolutionMethod = (evolutionDetails1, evolutionDetails2) => {
    return (
      <div className="pokemon_Split_Evolution_Method_Box">
        {renderEvolutionMethod(evolutionDetails1)}
        {renderEvolutionMethod(evolutionDetails2)}
      </div>
    );
  };

  const renderSplitEvolutionBox = (evolvesTo1, evolvesTo2) => {
    return (
      <div className="split_Evolution_Box_Container">
        {renderEvolutionBox(evolvesTo1)}
        {renderEvolutionBox(evolvesTo2)}
      </div>
    );
  };

  const renderSplitEvolutionDetails = (
    evolutionDetails1,
    evolutionDetails2,
    evolvesTo1,
    evolvesTo2,
  ) => {
    if (
      checkEvolutionGeneration(evolvesTo1.species.url) !== false &&
      checkEvolutionGeneration(evolvesTo2.species.url) !== false
    ) {
      return (
        <>
          {renderSplitEvolutionMethod(evolutionDetails1, evolutionDetails2)}
          {renderSplitEvolutionBox(evolvesTo1, evolvesTo2)}
        </>
      );
    } else if (
      checkEvolutionGeneration(evolvesTo1.species.url) !== false &&
      checkEvolutionGeneration(evolvesTo2.species.url) === false
    ) {
      return (
        <>
          {renderSplitEvolutionMethod(evolutionDetails1, null)}
          {renderSplitEvolutionBox(evolvesTo1, null)}
        </>
      );
    } else {
      return (
        <>
          {renderSplitEvolutionMethod(null, evolutionDetails2)}
          {renderSplitEvolutionBox(null, evolvesTo2)}
        </>
      );
    }
  };

  const renderEvolutionDetails = (evolutionDetails, evolvesTo) => {
    if (checkEvolutionGeneration(evolvesTo.species.url) !== false) {
      return (
        <>
          {renderEvolutionMethod(evolutionDetails)}
          {renderEvolutionBox(evolvesTo)}
        </>
      );
    }
  };

  const checkEvolutionGeneration = (url) => {
    let regex = /\d+/g;
    let idArray = url.match(regex);
    return idArray[1] <= 649;
  };

  return props.evolutions.species.name !== "eevee" &&
    props.evolutions.species.name !== "tyrogue" ? (
    <div className="pokemon_Evolution_Container">
      {/* Display first pokemon in evolution line */}
      <div
        className="pokemon_Evolution_Box"
        onClick={() =>
          props.fetchData(
            "https://pokeapi.co/api/v2/pokemon/" +
              props.evolutions.species.name,
          )
        }
      >
        {formatPokemonNames(props.evolutions.species.name)}
      </div>

      {/* Check if there is a 2nd Pokémon in the evolution line or if it is a split evo */}
      {props.evolutions.evolves_to.length === 1 &&
      checkEvolutionGeneration(props.evolutions.evolves_to[0].species.url) !==
        false
        ? renderEvolutionDetails(
            props.evolutions.evolves_to[0].evolution_details[0],
            props.evolutions.evolves_to[0],
          )
        : props.evolutions.evolves_to.length === 2
          ? renderSplitEvolutionDetails(
              props.evolutions.evolves_to[0].evolution_details[0],
              props.evolutions.evolves_to[1].evolution_details[0],
              props.evolutions.evolves_to[0],
              props.evolutions.evolves_to[1],
            )
          : null}

      {/* Check if there is a 3rd Pokémon in the evolution line or if it is a split evo */}
      {props.evolutions.evolves_to[0].evolves_to.length === 1 &&
      checkEvolutionGeneration(
        props.evolutions.evolves_to[0].evolves_to[0].species.url,
      ) !== false
        ? renderEvolutionDetails(
            props.evolutions.evolves_to[0].evolves_to[0].evolution_details[0],
            props.evolutions.evolves_to[0].evolves_to[0],
          )
        : props.evolutions.evolves_to[0].evolves_to.length === 2
          ? renderSplitEvolutionDetails(
              props.evolutions.evolves_to[0].evolves_to[0].evolution_details[0],
              props.evolutions.evolves_to[0].evolves_to[1].evolution_details[0],
              props.evolutions.evolves_to[0].evolves_to[0],
              props.evolutions.evolves_to[0].evolves_to[1],
            )
          : null}
    </div>
  ) : (
    <div className="pokemon_Evolution_Container">
      {/* Display first pokemon in evolution line */}
      <div
        className="pokemon_Evolution_Box"
        onClick={() =>
          props.fetchData(
            "https://pokeapi.co/api/v2/pokemon/" +
              props.evolutions.species.name,
          )
        }
      >
        {formatPokemonNames(props.evolutions.species.name)}
      </div>
      <div>
        {props.evolutions.evolves_to.map((value, index) =>
          renderEvolutionDetails(
            props.evolutions.evolves_to[index].evolution_details[0],
            props.evolutions.evolves_to[index],
          ),
        )}
      </div>
    </div>
  );
}

export default Evolutions;
