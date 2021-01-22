import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditReqProduct from "../Components/EditReqProduct";

class ShowReqProducts extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    products: [],
    EditProductReqShow: false,
  };
  componentDidMount = () => {
    fetch("https://localhost:44331/api/ProductRequest")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  DeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/ProductRequest/" + id, {
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
    const {
      productRequestId,
      name,
      name1,
      name2,
      RequestedQuantity,
    } = this.state;

    const { length: count } = this.state.products;
    const { pageSize, currentPage, products: allProducts } = this.state;
    const Products = paginate(allProducts, currentPage, pageSize);
    return (
      <>
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>ProductRequest ID</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Product Brand</th>
              <th>Product Category</th>
              <th>Request Quantity</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr key={product.productRequestId}>
                <td>{product.productRequestId}</td>
                <td>{product.name}</td>
                <td>{product.productCode}</td>
                <td>{product.name1}</td>
                <td>{product.name2}</td>
                <td>{product.requestedQuantity}</td>
                <td>{product.requestedPrice}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editProductReqexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditProductReqShow: true,
                        productRequestId: product.productRequestId,
                        name: product.name,
                        name1: product.name1,
                        name2: product.name2,
                        RequestedQuantity: product.RequestedQuantity,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteProduct(product.productRequestId)}
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

        <EditReqProduct
          show={this.state.EditProductReqShow}
          onHide={this.EditProductReqClose}
          productRequestId={productRequestId}
          name={name}
          name1={name1}
          name2={name2}
          RequestedQuantity={RequestedQuantity}
        />
      </>
    );
  }
}

export default ShowReqProducts;
