import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styleSheets/NavbarStyles.css";

/**
 * Navbar
 *
 * The navbar creates the navigation bar displayed at the top of every page.
 * Users can navigate between pages by clicking the links on the navbar.
 *
 * Disappearing navbar code from user Hadi Masoumi at: https://stackoverflow.com/questions/69473259/how-to-show-or-hide-navbar-when-scroll-use-react-js.
 *
 * @author Owen Gittins
 */

function Navbar(props) {
  const [hidden, setHidden] = useState(false);
  const [scroll, setScroll] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY < scroll) {
        //If scroll down hide the navbar
        setHidden(false);
      } else {
        //If scroll up show the navbar
        setHidden(true);
      }

      //Remember current page location to use in the next move
      setScroll(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      //Cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [scroll]);
  return (
    <ul className={`customul ${hidden && "hidden"}`}>
      <li className="titleli">
        <NavLink to="/">2Ddex</NavLink>
      </li>
      <li>
        <NavLink to="/">Pokedex</NavLink>
      </li>
      <li>
        <NavLink to="/counter">Counter</NavLink>
      </li>
      <li>
        <NavLink to="/hunts">Hunts</NavLink>
      </li>
    </ul>
  );
}
export default Navbar;
