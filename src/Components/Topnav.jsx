import React, { Component } from "react";

class Topnav extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="col-xl-10 col-lg-9 col-md-8 ml-auto fixed-top py-2 top-navbar">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h4 className="text-light text-uppercase mb-0"></h4>
            </div>
            <div className="col-md-5">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    id="search-input"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <button
                    type="button"
                    id="search-button"
                    className="btn btn-white"
                  >
                    search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <ul className="navbar-nav">
                <li className="nav-item icon-parent">
                  <a href="#" className="nav-link icon-bullet">
                    Cmnts
                  </a>
                </li>
                <li className="nav-item icon-parent">
                  <a href="#" className="nav-link icon-bullet">
                    Notif
                  </a>
                </li>
                <li className="nav-item ml-md-auto">
                  <a
                    href="#"
                    className="nav-link"
                    data-toggle="modal"
                    data-target="#sign-out"
                  >
                    Sign-out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topnav;
