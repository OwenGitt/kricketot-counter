import EvolutionItem from "./EvolutionItem";
import CheckEvolution from "./CheckEvolution";

function Evolutions(props) {
  return (
    <div className="pokemon_Evolution_Container">
      {/* Display first pokemon in evolution line */}
      <div
        className="pokemon_Evolution_Box"
        onClick={() =>
          props.fetchData(
            "https://pokeapi.co/api/v2/pokemon/" + props.evolutions.species.name
          )
        }
      >
        {props.evolutions.species.name.charAt(0).toUpperCase() +
          props.evolutions.species.name.slice(1)}
      </div>
      {/* Display an arrow box */}
      <div className="pokemon_Evolution_Method_Box">
        {/** Check to see if the evolution is split or not, then determine the pokemons evolution method */}
        {props.evolutions.evolves_to.length === 1 ? (
          props.evolutions.evolves_to[0].evolution_details[0].item !== null ? (
            <EvolutionItem
              method={"Use"}
              url={props.evolutions.evolves_to[0].evolution_details[0].item.url}
            />
          ) : props.evolutions.evolves_to[0].evolution_details[0].held_item !==
            null ? (
            <EvolutionItem
              method={"Trade"}
              url={
                props.evolutions.evolves_to[0].evolution_details[0].held_item
                  .url
              }
            />
          ) : (
            <CheckEvolution
              evolutionDetails={
                props.evolutions.evolves_to[0].evolution_details[0]
              }
            ></CheckEvolution>
          )
        ) : /*If the evolution is split at stage 1-2 display both evolution methods*/
        props.evolutions.evolves_to.length === 2 ? (
          <div className="item_Evolution_Container">
            {/* Display evolution method for the first pokemon in the split evolution */}
            {props.evolutions.evolves_to[0].evolution_details[0].item !==
            null ? (
              <EvolutionItem
                method={"Use"}
                url={
                  props.evolutions.evolves_to[0].evolution_details[0].item.url
                }
              />
            ) : props.evolutions.evolves_to[0].evolution_details[0]
                .held_item !== null ? (
              <EvolutionItem
                method={"Trade"}
                url={
                  props.evolutions.evolves_to[0].evolution_details[0].held_item
                    .url
                }
              />
            ) : (
              <CheckEvolution
                evolutionDetails={
                  props.evolutions.evolves_to[0].evolution_details[0]
                }
              ></CheckEvolution>
            )}
            {/* Display evolution method for the second pokemon in the split evolution */}
            {props.evolutions.evolves_to[1].evolution_details[0].item !==
            null ? (
              <EvolutionItem
                method={"Use"}
                url={
                  props.evolutions.evolves_to[1].evolution_details[0].item.url
                }
              />
            ) : props.evolutions.evolves_to[1].evolution_details[0]
                .held_item !== null ? (
              <EvolutionItem
                method={"Trade"}
                url={
                  props.evolutions.evolves_to[1].evolution_details[0].held_item
                    .url
                }
              />
            ) : (
              <CheckEvolution
                evolutionDetails={
                  props.evolutions.evolves_to[1].evolution_details[0]
                }
              ></CheckEvolution>
            )}
          </div>
        ) : null}
      </div>
      {/* Display the two pokemon in the split evolution line of the pokemon at stage 1-2 (if split)*/}
      {props.evolutions.evolves_to.length === 2 ? (
        <div>
          <div
            className="pokemon_Evolution_Box"
            onClick={() =>
              props.fetchData(
                "https://pokeapi.co/api/v2/pokemon/" +
                  props.evolutions[0].species.name
              )
            }
          >
            {props.evolutions.evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
              props.evolutions.evolves_to[0].species.name.slice(1)}
          </div>
          <div
            className="pokemon_Evolution_Box"
            onClick={() =>
              props.fetchData(
                "https://pokeapi.co/api/v2/pokemon/" +
                  props.evolutions[1].species.name
              )
            }
          >
            {props.evolutions.evolves_to[1].species.name
              .charAt(0)
              .toUpperCase() +
              props.evolutions.evolves_to[1].species.name.slice(1)}
          </div>
        </div>
      ) : (
        /* Otherwise display next pokemon in the evolution line */
        <div className="pokemon_Evolution_Box_Container">
          <div
            className="pokemon_Evolution_Box"
            onClick={() =>
              props.fetchData(
                "https://pokeapi.co/api/v2/pokemon/" +
                  props.evolutions.evolves_to[0].species.name
              )
            }
          >
            {props.evolutions.evolves_to[0].species.name
              .charAt(0)
              .toUpperCase() +
              props.evolutions.evolves_to[0].species.name.slice(1)}
          </div>
          {/* Check if there is another pokemon in the evolution line, if so display another arrow */}
          {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
            <div className="pokemon_Evolution_Method_Box">
              {/* Display evolution method for the next evolution */}
              {props.evolutions.evolves_to[0].evolves_to[0].evolution_details[0]
                .item !== null ? (
                <EvolutionItem
                  method={"Use"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0].item.url
                  }
                />
              ) : props.evolutions.evolves_to[0].evolves_to[0]
                  .evolution_details[0].held_item !== null ? (
                <EvolutionItem
                  method={"Trade"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0].held_item.url
                  }
                />
              ) : (
                <CheckEvolution
                  evolutionDetails={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0]
                  }
                ></CheckEvolution>
              )}
            </div>
          ) : props.evolutions.evolves_to[0].evolves_to.length === 2 ? (
            <div className="pokemon_Evolution_Method_Box">
              {/* Display evolution method for the first pokemon in the split evolution */}
              {props.evolutions.evolves_to[0].evolves_to[0].evolution_details[0]
                .item !== null ? (
                <EvolutionItem
                  method={"Use"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0].item.url
                  }
                />
              ) : props.evolutions.evolves_to[0].evolves_to[0]
                  .evolution_details[0].held_item !== null ? (
                <EvolutionItem
                  method={"Trade"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0].held_item.url
                  }
                />
              ) : (
                <CheckEvolution
                  evolutionDetails={
                    props.evolutions.evolves_to[0].evolves_to[0]
                      .evolution_details[0]
                  }
                ></CheckEvolution>
              )}
              {/* Display evolution method for the second pokemon in the split evolution */}
              {props.evolutions.evolves_to[0].evolves_to[1].evolution_details[0]
                .item !== null ? (
                <EvolutionItem
                  method={"Use"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[1]
                      .evolution_details[0].item.url
                  }
                />
              ) : props.evolutions.evolves_to[0].evolves_to[1]
                  .evolution_details[0].held_item !== null ? (
                <EvolutionItem
                  method={"Trade"}
                  url={
                    props.evolutions.evolves_to[0].evolves_to[1]
                      .evolution_details[0].held_item.url
                  }
                />
              ) : (
                <CheckEvolution
                  evolutionDetails={
                    props.evolutions.evolves_to[0].evolves_to[1]
                      .evolution_details[0]
                  }
                ></CheckEvolution>
              )}
            </div>
          ) : null}

          {/* If there is only 1 evolution left to do display it in a box */}
          {props.evolutions.evolves_to[0].evolves_to.length === 1 ? (
            <div
              className="pokemon_Evolution_Box"
              onClick={() =>
                props.fetchData(
                  "https://pokeapi.co/api/v2/pokemon/" +
                    props.evolutions.evolves_to[0].evolves_to[0].species.name
                )
              }
            >
              {props.evolutions.evolves_to[0].evolves_to[0].species.name
                .charAt(0)
                .toUpperCase() +
                props.evolutions.evolves_to[0].evolves_to[0].species.name.slice(
                  1
                )}
            </div>
          ) : /* Otherwise display the split evolution line */
          props.evolutions.evolves_to[0].evolves_to.length === 2 ? (
            <div className="split_Evolution_Box_Container">
              <div
                className="pokemon_Evolution_Box"
                onClick={() =>
                  props.fetchData(
                    "https://pokeapi.co/api/v2/pokemon/" +
                      props.evolutions.evolves_to[0].evolves_to[0].species.name
                  )
                }
              >
                {props.evolutions.evolves_to[0].evolves_to[0].species.name
                  .charAt(0)
                  .toUpperCase() +
                  props.evolutions.evolves_to[0].evolves_to[0].species.name.slice(
                    1
                  )}
              </div>
              <div
                className="pokemon_Evolution_Box"
                onClick={() =>
                  props.fetchData(
                    "https://pokeapi.co/api/v2/pokemon/" +
                      props.evolutions.evolves_to[0].evolves_to[1].species.name
                  )
                }
              >
                {props.evolutions.evolves_to[0].evolves_to[1].species.name
                  .charAt(0)
                  .toUpperCase() +
                  props.evolutions.evolves_to[0].evolves_to[1].species.name.slice(
                    1
                  )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default Evolutions;
