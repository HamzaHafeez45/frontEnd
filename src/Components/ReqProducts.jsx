import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowReqProducts from "../Components/ShowReqProducts";
import Nav from "../Components/Nav";
class ReqProducts extends Component {
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
                  to="/addReqProduct"
                >
                  Purchased Products
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">
                  Purchased Products
                </h3>
                <ShowReqProducts />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ReqProducts;
