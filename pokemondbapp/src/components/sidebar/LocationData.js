import { useEffect, useState } from "react";
import "../styleSheets/locationData.css";

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

  const removeGameName = (locationName) => {
    let displayName = locationName
      .replace("-area", "")
      .replace("area", "")
      // Remove region names
      .replace("kanto-", "")
      .replace("johto-", "")
      .replace("hoenn-", "")
      .replace("sinnoh-", "")
      .replace("unova-", "")
      .replaceAll("-", " ")
      // Capitalize important locations that appear in sentence
      .replace("pewter", "Pewter")
      .replace("viridian", "Viridian")
      .replace("pastoria", "Pastoria")
      .replace("celestic", "Celestic")
      .replace("eterna", "Eterna")
      .replace("solaceon", "Solaceon")
      .replace("mauville", "Mauville")
      .replace("new bark", "New Bark")
      .replace("floaroma", "Floaroma")
      .replace("hearthome", "Hearthome")
      .replace("jubilife", "Jubilife")
      .replace("verity", "Verity")
      .replace("cinnabar lab", "- Cinnabar Lab")
      .replace("cave", "Cave")
      .replace("island", "Island")
      .replace("chasm", "Chasm")
      .replace("town", "Town")
      .replace("city", "City")
      .replace("tower", "Tower")
      .replace("tomb", "Tomb")
      .replace("forest", "Forest")
      .replace("path", "Path")
      .replace("sewers", "Sewers")
      .replace("canyon", "Canyon")
      .replace("alph", "Alph")
      // Capitalize Mt location
      .replace("moon", "Moon")
      .replace("coronet", "Coronet")
      .replace("mortar", "Mortar")
      .replace("pyre", "Pyre")
      // Format safari zone areas
      .replace("great marsh", "Great Marsh")
      .replace("Great Marsh 1", "Great Marsh Zone 1")
      .replace("Great Marsh 2", "Great Marsh Zone 2")
      .replace("Great Marsh 3", "Great Marsh Zone 3")
      .replace("Great Marsh 4", "Great Marsh Zone 4")
      .replace("Great Marsh 5", "Great Marsh Zone 5")
      .replace("Great Marsh 6", "Great Marsh Zone 6")
      .replace("safari zone", "Safari Zone")
      .replace("Safari Zone 1", "Safari Zone Area 1")
      .replace("Safari Zone 2", "Safari Zone Area 2")
      .replace("Safari Zone 3", "Safari Zone Area 3")
      .replace("Safari Zone 4", "Safari Zone Area 4")
      .replace("Safari Zone middle", "Safari Zone Middle")
      .replace("zone marshland", " - Marshland")
      .replace("zone meadow", " - Meadow")
      .replace("zone forest", " - Forest")
      .replace("zone peak", " - Peak")
      .replace("zone wasteland", " - Wasteland")
      .replace("zone wetland", " - Wetland")
      .replace("zone rocky beach", " - Rocky Beach")
      .replace("zone swamp", " - Swamp")
      .replace("zone savannah", " - Savannah")
      .replace("zone mountain", " - Mountain")
      .replace("zone desert", "- Desert")
      // Sub areas
      .replace("outside", "- Outside")
      .replace("summit", "- Summit")
      .replace("underwater", "- Underwater")
      .replace("mountainside", "- Mountainside")
      .replace("b1f", "- B1F")
      .replace("b2f", "- B2F")
      .replace("b3f", "- B3F")
      .replace("b4f", "- B4F")
      .replace("b5f", "- B5F")
      .replace("b6f", "- B6F")
      .replace("b7f", "- B7F")
      .replace("b8f", "- B8F")
      .replace("b9f", "- B9F")
      .replace("b10f", "- B10F")
      .replace("b11f", "- B11F")
      .replace("1f", " 1F")
      .replace("2f", "- 2F")
      .replace("3f", "- 3F")
      .replace("4f", "- 4F")
      .replace("5f", "- 5F")
      .replace("6f", "- 6F")
      .replace("7f", "- 7F")
      .replace("8f", "- 8F")
      .replace("9f", "- 9F")
      .replace("10f", "- 10F")
      .replace("11f", "- 11F")
      // Remove bike names
      .replace("acro bike", "")
      .replace("mach bike", "")
      // Capitalize directions
      .replace(" ne", " NE")
      .replace(" nw", " NW")
      .replace(" se", " SE")
      .replace(" sw", " SW")
      .replace(" n", " N")
      .replace(" s", " S")
      .replace(" e", " E")
      .replace(" w", " W")
      // Misc
      .replace(" before galactic intervention", "")
      .replace(" after galactic intervention", "")
      .replace("unknown all rattata", "")
      .replace("Ss anne", "SS Anne");
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };

  useEffect(() => {
    resetLocationData();
    setCompleted(false);
    props.jsonLocData.map((location, key) =>
      location.version_details.map((locationVersion) =>
        allGenGames.map((genArray) => {
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
  }, [props.jsonLocData]);

  return (
    <div>
      {completed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.keys(locationData).map((game) =>
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
                      ? removeGameName(location) + ", "
                      : removeGameName(location)
                  )}
                </div>
              </div>
            ) : // <div style={{ display: "flex", flexDirection: "row" }}>
            //   <h5 className="sidebarSubHeader">
            //     {game.charAt(0).toUpperCase() + game.slice(1)}
            //   </h5>
            //   <div style={{ fontSize: "14px", color: "rgb(241, 241, 241)" }}>
            //     Evolve or trade to obtain
            //   </div>
            // </div>
            null
          )}
        </div>
      ) : (
        <div>LOADING LOCATION DATA...</div>
      )}
    </div>
  );
}
export default LocationData;
