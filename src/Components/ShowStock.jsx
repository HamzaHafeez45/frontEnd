import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditStock from "./EditStock";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";

class ShowRoutes extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    stock: [],
    EditStockShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Stock")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ stock: data });
      });
  };

  DeleteStock = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Stock/" + id, {
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
              let stock = this.state.stock.filter((m) => m.stockId !== id);
              this.setState({ stock });
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
    const { stockId, name, productQuantity, name1, searchQuery } = this.state;
    const { length: count } = this.state.stock;
    const { pageSize, currentPage, stock: allStock } = this.state;
    let filtered = allStock;
    if (searchQuery)
      filtered = allStock.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Stock = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Stock ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Warehouse</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Stock.map((st) => (
              <tr key={st.stockId}>
                <td>{st.stockId}</td>
                <td>{st.name}</td>
                <td>{st.productQuantity}</td>
                <td>{st.stockPrice}</td>
                <td>{st.name1}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editStockexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditStockShow: true,
                        stockId: st.stockId,
                        name: st.name,
                        productQuantity: st.productQuantity,
                        name1: st.name1,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteStock(st.stockId)}
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

        <EditStock
          show={this.state.EditStockShow}
          onHide={this.EditStockClose}
          stockId={stockId}
          name={name}
          productQuantity={productQuantity}
          name1={name1}
        />
      </>
    );
  }
}

export default ShowRoutes;
