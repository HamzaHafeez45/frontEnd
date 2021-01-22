import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowCustomers from "../Components/ShowCustomers";
import Nav from "../Components/Nav";
class Cities extends Component {
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
                  to="/addCustomer"
                >
                  Add Customer
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">Customers</h3>
                <ShowCustomers />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Cities;
