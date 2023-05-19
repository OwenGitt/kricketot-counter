import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styleSheets/NavbarStyles.css";

/**
 * Navbar
 *
 * The navbar creates the navigation bar displayed at the top of every page.
 * Users can navigate between pages by clicking the links on the navbar.
 * The authenticated prop is used to determine if the user is signed in or not.
 * If the user is signed in a logout button will be displayed to the user which
 * will allow the user to logout by changing the authenticated prop and removing
 * the token.
 *
 * @author Owen Gittins
 */

function Navbar(props) {
  const [hidden, setHidden] = useState(false);
  const [scroll, setScroll] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY < scroll) {
        // if scroll down hide the navbar
        setHidden(false);
      } else {
        // if scroll up show the navbar
        setHidden(true);
      }

      // remember current page location to use in the next move
      setScroll(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [scroll]);
  return (
    <ul className={`customul ${hidden && "hidden"}`}>
      <li className="titleli">
        <NavLink to="/">Kricketot Hub</NavLink>
      </li>
      <li>
        <NavLink to="/">Pokemon</NavLink>
      </li>
      <li>
        <NavLink to="/counter">Counter</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </ul>
  );
}
export default Navbar;
