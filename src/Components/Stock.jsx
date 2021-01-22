import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import ShowStock from "../Components/ShowStock";
class Stock extends Component {
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
                  to="/addStock"
                >
                  Add Stock
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">Stock</h3>
                <ShowStock />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Stock;
