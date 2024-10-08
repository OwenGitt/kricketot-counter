import "./App.css";
import { Routes, Route } from "react-router-dom";
import PokemonPage from "./pages/PokemonPage";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HuntsPage from "./pages/HuntsPage.js";
import Navbar from "./components/navigation/Navbar";
import CounterPage from "./pages/CounterPage";

/**
 * App
 *
 * Main page for the app. Designates the routes to each page
 * calling each relevant function for each page.
 * @author Owen Gittins
 */
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=649&offset=0")
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json.results);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => response.json())
      .then((json) => {
        setAllTypes(json.results);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PokemonPage
              pokemon={pokemon}
              loading={loading}
              allTypes={allTypes}
            />
          }
        />
        <Route path="/hunts" element={<HuntsPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
