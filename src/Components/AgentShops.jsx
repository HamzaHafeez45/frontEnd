import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShopAgent from "./TableShopAgent";
import Nav from "../Components/Nav";
class AgentShops extends Component {
  render() {
    return (
      <>
        <Nav />
        <section>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <div className="row">
                  <div className="col-md-3">
                    <ul class="list-group">
                      <li class="list-group-item active">Cras justo odio</li>
                      <li class="list-group-item">Dapibus ac facilisis in</li>
                      <li class="list-group-item">Morbi leo risus</li>
                      <li class="list-group-item">Porta ac consectetur ac</li>
                      <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                  </div>
                  <div className="col-md-9">
                    <h3 className="text-muted text-center mb-3">
                      Agents/Employees
                    </h3>
                    <ShopAgent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AgentShops;
