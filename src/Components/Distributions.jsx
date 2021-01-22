import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowDistributions from "./ShowDistributions";
import Nav from "../Components/Nav";
class Distributions extends Component {
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
                  to="/addDistributions"
                >
                  Add Distribution
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">
                  Distributions
                </h3>
                <ShowDistributions />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Distributions;
