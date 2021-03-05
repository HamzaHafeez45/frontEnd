import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import ShowAssignedShops from "../Components/showAssignedShops";
class AssignedShops extends Component {
  render() {
    return (
      <>
        <Nav />
        <section>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <Link
                  className="btn btn-md btn-success float-right"
                  to="/assignShop"
                >
                  Assign Shop
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">
                  Agent's Shops
                </h3>
                <ShowAssignedShops />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AssignedShops;
