import { NavLink } from "react-router-dom";
import s from "./NavbarStyles.css";

function Navbar() {
  return (
    <ul className={s.customul}>
      <li className={s.titleli}>
        <NavLink to="/">ShinyDex</NavLink>
      </li>
      <li className={s.normalli}>
        <NavLink to="/">Pokedex</NavLink>
      </li>
      {/* <li className="normalli">
        <NavLink to="/counter">Counter</NavLink>
      </li> */}
      <li className={s.normalli}>
        <NavLink to="/hunts">Hunts</NavLink>
      </li>
    </ul>
  );
}
export default Navbar;
