import React, { Component } from "react";
import Nav from "../Components/Nav";
import ShowOrders from "../Components/showOrders";
class Order extends Component {
  render() {
    return (
      <>
        <Nav />
        <section>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <h3 className="text-muted text-center mb-3 mt-5">Orders</h3>
                <ShowOrders />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Order;
