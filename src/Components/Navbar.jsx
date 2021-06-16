import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink exact className="navbar-brand px-4" to="/">
                Managment Studio
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mx-5">
                    <NavLink
                      exact
                      className="nav-link text-dark px-4"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item"></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
