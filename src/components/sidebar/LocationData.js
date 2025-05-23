import { useEffect, useState } from "react";
import "../../styleSheets/locationDataStyles.css";
import { formatText } from "../../textReplacer.ts";

function LocationData(props) {
  const [completed, setCompleted] = useState(false);
  const [gen1Games] = useState(["red", "blue", "yellow"]);
  const [gen2Games] = useState(["gold", "silver", "crystal"]);
  const [gen3Games] = useState([
    "ruby",
    "sapphire",
    "emerald",
    "firered",
    "leafgreen",
  ]);
  const [gen4Games] = useState([
    "diamond",
    "pearl",
    "platinum",
    "heartgold",
    "soulsilver",
  ]);
  const [gen5Games] = useState(["black", "white", "black-2", "white-2"]);
  const [allGenGames] = useState([
    gen1Games,
    gen2Games,
    gen3Games,
    gen4Games,
    gen5Games,
  ]);
  const [locationData, setLocationData] = useState({
    red: [],
    blue: [],
    yellow: [],
    gold: [],
    silver: [],
    crystal: [],
    ruby: [],
    sapphire: [],
    emerald: [],
    firered: [],
    leafgreen: [],
    diamond: [],
    pearl: [],
    platinum: [],
    heartgold: [],
    soulsilver: [],
    black: [],
    white: [],
    "black-2": [],
    "white-2": [],
  });

  const updateLocationData = (key, newData) => {
    setLocationData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], newData],
    }));
  };

  const resetLocationData = () => {
    setLocationData((prevData) => {
      Object.keys(prevData).forEach((key) => {
        prevData[key] = []; // Reset each array to an empty array
      });
      return { ...prevData }; // Ensure new object reference to trigger state update
    });
  };

  useEffect(() => {
    resetLocationData();
    setCompleted(false);
    props.jsonLocData.map((location) =>
      location.version_details.map((locationVersion) =>
        allGenGames.forEach((genArray) => {
          if (genArray.includes(locationVersion.version.name)) {
            updateLocationData(
              locationVersion.version.name,
              location.location_area.name
            );
          }
        })
      )
    );
    setCompleted(true);
  }, [allGenGames, props.jsonLocData]);

  return (
    <div>
      {completed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.keys(locationData).map(
            (game) =>
              locationData[game].length > 0 ? (
                <div className="location-game-data">
                  <h5 className={game}>
                    {game.charAt(0).toUpperCase() +
                      game
                        .replace("green", "Green")
                        .replace("red", "Red")
                        .replace("-", " ")
                        .slice(1)}
                  </h5>
                  <div className="location-routes">
                    {locationData[game].map((location, index) =>
                      index !== locationData[game].length - 1
                        ? formatText(location) + ", "
                        : formatText(location)
                    )}
                  </div>
                </div>
              ) : (
                <div className="location-game-data">
                  <h5 className={game}>
                    {game.charAt(0).toUpperCase() + game.slice(1)}
                  </h5>
                  <div className="location-routes">
                    Evolve or trade to obtain
                  </div>
                </div>
              )
            // null,
          )}
        </div>
      ) : (
        <div>LOADING LOCATION DATA...</div>
      )}
    </div>
  );
}

export default LocationData;
