import React, { Component } from "react";
import Sidenav from "./Sidenav";
class Nav extends Component {
  state = {};
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-light">
          <button
            className="navbar-toggler ml-auto mb-2 bg-light"
            type="button"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="myNavbar">
            <div className="container-fluid">
              <div className="row">
                <Sidenav />
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
