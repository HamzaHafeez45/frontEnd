import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowOrders extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    orders: [],
    EditOrderShow: false,
    searchQuery: "",
  };

  componentDidMount = async () => {
    const response = await fetch("http://sndwebapi.spikotech.com/api/Order");
    const orders = await response.json();
    this.setState({ orders });
  };

  DeleteOrder = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Order/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then(
          (result) => {
            if (result === "Deleted Successfully") {
              let orders = this.state.orders.filter((m) => m.orderId !== id);
              this.setState({ orders });
              toast(result);
            } else {
              toast.error(result);
            }
          },
          (error) => {
            toast.error(error);
          }
        );
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  render() {
    const { length: count } = this.state.orders;
    const {
      pageSize,
      currentPage,
      orders: allOrders,
      searchQuery,
    } = this.state;
    let filtered = allOrders;
    if (searchQuery)
      filtered = allOrders.filter((m) =>
        m.Shop.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Orders = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Order Id</th>
              <th>Shop</th>
              <th>Agent</th>
              <th>Amount</th>
              <th>Profit</th>
              <th>Date</th>
              <th>Details</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.Shop}</td>
                <td>{order.Agent}</td>
                <td>{order.totalAmount}</td>
                <td>{order.totalProfit}</td>
                <td>{order.orderDate.slice(0, 10)}</td>
                <td>
                  <Link
                    className="btn btn-warning btn-sm"
                    to={`/details/${order.orderId}`}
                  >
                    Details
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteOrder(order.orderId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default ShowOrders;
