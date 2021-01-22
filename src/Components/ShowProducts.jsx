import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditProduct from "../Components/EditProduct";

class ShowProducts extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    products: [],
    EditProductShow: false,
  };
  componentDidMount = () => {
    fetch("https://localhost:44331/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  DeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Product/" + id, {
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
      productId,
      name,
      productCode,
      productPrice,
      expireable,
      name1,
      name2,
    } = this.state;

    const { length: count } = this.state.products;
    const { pageSize, currentPage, products: allProducts } = this.state;
    const Products = paginate(allProducts, currentPage, pageSize);
    return (
      <>
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Product Price</th>
              <th>Product Expireable</th>
              <th>Brand</th>
              <th>Product Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.productCode}</td>

                <td>{product.productPrice}</td>
                <td>{product.expireable}</td>
                <td>{product.name1}</td>
                <td>{product.name2}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editProductexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditProducttShow: true,
                        productId: product.productId,
                        name: product.name,
                        productCode: product.productCode,
                        productPrice: product.productPrice,
                        expireable: product.expireable,
                        name1: product.name1,
                        name2: product.name2,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteProduct(product.productId)}
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

        <EditProduct
          show={this.state.EditProducttShow}
          onHide={this.EditProductClose}
          productId={productId}
          name={name}
          productCode={productCode}
          productPrice={productPrice}
          expireable={expireable}
          name1={name1}
          name2={name2}
        />
      </>
    );
  }
}

export default ShowProducts;
