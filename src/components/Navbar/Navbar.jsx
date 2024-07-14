import "./Navbar.css";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../store/auth";

const Navbar = () => {
  const { IsLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">HJ Tech Solutions</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/service">Service</NavLink>
              </li>

              {IsLoggedIn ? (
                <li>
                  <NavLink to="/logout">Log out</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Sign In</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Log In</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;

// a href is reloading the page again and again so we are using Navlink insted of that and wth to attribute
