import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

class OrderDetailPage extends Component {
  state = {
    orderedProducts: [],
    order: [],
  };

  componentDidMount = () => {
    this.getOrderDetails();
    this.getOrderedProducts();
  };
  getOrderDetails = (id) => {
    fetch(
      "http://sndwebapi.spikotech.com/api/Order/" + this.props.match.params.id
    )
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ order: data });
      });
  };
  getOrderedProducts = (id) => {
    fetch(
      "http://sndwebapi.spikotech.com/api/OrderedProduct/" +
        this.props.match.params.id
    )
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ orderedProducts: data });
        console.log(data);
      });
  };
  render() {
    const { orderedProducts, order } = this.state;
    return (
      <>
        <Nav />
        <section>
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <div className="row ">
                  <div className="col-sm-6 ">
                    <h4 className="text-muted mb-4">Sales&Distribution</h4>
                    <p>Address: Lahore,Pakistan</p>
                    <p>Phone: 0900-78601</p>
                  </div>
                  <div className="col-sm-6 ">
                    <h4 className="text-muted mb-4">Customer</h4>
                    {order.map((order) => (
                      <div key={order.orderId}>
                        <p>
                          <strong>Customer</strong>: {order.Shop}
                        </p>
                        <p>
                          <strong>Agent</strong> : {order.Agent}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <table class="table table-striped bg-light text-center">
                  <thead>
                    <tr class="text-muted">
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedProducts.map((order) => (
                      <tr key={order.orderId}>
                        <td>{order.name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4 className=" text-dark mt-5">
                  {order.map((order) => (
                    <div key={order.orderId}>
                      <strong>Total Amount: </strong>
                      <p className="float-right mr-3">
                        Rs {order.totalAmount}.
                      </p>
                    </div>
                  ))}
                </h4>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default OrderDetailPage;
