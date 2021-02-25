import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Sidenav extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
          <NavLink
            exact
            className="navbar-brand d-block mx-auto text-center text-info"
            to="/dashboard"
          >
            Sales&Distribution
          </NavLink>
          <ul className="navbar-nav flex-column" id="sidenav01">
            <li className="nav-item">
              <NavLink exact className="nav-link text-dark" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item sidebar-link">
              <NavLink
                exact
                className="nav-link collapsed sidebar-link"
                to="#"
                data-toggle="collapse"
                data-target="#toggleDemo2"
                data-parent="#sidenav01"
              >
                General Managment
                <i class="fa fa-caret-down ml-1 mt-1"></i>
              </NavLink>
              <div className="collapse" id="toggleDemo2">
                <ul className="nav nav-list">
                  <li className="dropdown-item">
                    <NavLink
                      exact
                      className="nav-link text-dark"
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/brand">
                      Brands
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/cities">
                      Cities
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink
                      exact
                      className="nav-link text-dark sidebar-link"
                      to="/areas"
                    >
                      Areas
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink
                      exact
                      className="nav-link text-dark sidebar-link"
                      to="/expenses"
                    >
                      Expenses
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="/distributions"
              >
                Distribution
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark collapsed"
                to="#"
                data-toggle="collapse"
                data-target="#toggleAgent"
                data-parent="#sidenav01"
              >
                Agent <i class="fa fa-caret-down ml-1 mt-1"></i>
              </NavLink>
              <div className="collapse" id="toggleAgent">
                <ul className="nav nav-list">
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/agents">
                      Agents
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="/customers"
              >
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="/routes"
              >
                routes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark collapsed"
                to="#"
                data-toggle="collapse"
                data-target="#toggleInventory"
                data-parent="#sidenav01"
              >
                Inventory <i class="fa fa-caret-down ml-1 mt-1"></i>
              </NavLink>
              <div className="collapse" id="toggleInventory">
                <ul className="nav nav-list">
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/product">
                      Products
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink
                      exact
                      className="nav-link text-dark"
                      to="/requestProduct"
                    >
                      Purchased Product
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/stock">
                      Stock
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="/order"
              >
                Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="/warehouse"
              >
                Warehouse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link text-dark sidebar-link"
                to="#"
                data-toggle="collapse"
                data-target="#togglereport"
                data-parent="#sidenav01"
              >
                Reports<i class="fa fa-caret-down ml-1 mt-1"></i>
              </NavLink>
              <div className="collapse" id="togglereport">
                <ul className="nav nav-list">
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/product">
                      1
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink
                      exact
                      className="nav-link text-dark"
                      to="/requestProduct"
                    >
                      2
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink exact className="nav-link text-dark" to="/stock">
                      3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Sidenav;
