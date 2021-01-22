import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditStock from "../Components/EditStock";

class ShowRoutes extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    stock: [],
    EditStockShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/Stock")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ stock: data });
        console.table(data);
      });
  };

  DeleteStock = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Stock/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then(
          (result) => {
            alert(result);
          },
          (error) => {
            alert(error);
          }
        );
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { stockId, name, productQuantity, name1 } = this.state;

    const { length: count } = this.state.stock;

    const { pageSize, currentPage, stock: allStock } = this.state;

    const Stock = paginate(allStock, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>Stock ID</th>
              <th>Product Name</th>
              <th>Product Quantity</th>
              <th>Stock Price</th>
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
