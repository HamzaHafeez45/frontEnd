import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditProduct from "./EditProduct";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";

class ShowProducts extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    products: [],
    EditProductShow: false,
    searchQuery: "",
  };
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  DeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Product/" + id, {
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
              let allProducts = this.state.products.filter(
                (m) => m.productId !== id
              );
              this.setState({ products: allProducts });
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
    const {
      productId,
      productName,
      productCode,
      productPrice,
      expireable,
      name,
      unit,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.products;
    const { pageSize, currentPage, products: allProducts } = this.state;
    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Products = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table className="table table-responsive table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>Code</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Expireable</th>
              <th>Brand</th>
              <th>Unit</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>{product.productCost}</td>
                <td>{product.productPrice}</td>
                <td>{product.expireable}</td>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editProductexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditProducttShow: true,
                        productId: product.productId,
                        productName: product.productName,
                        productCode: product.productCode,
                        productPrice: product.productPrice,
                        expireable: product.expireable,
                        name: product.name,
                        unit: product.unit,
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
          productName={productName}
          productCode={productCode}
          productPrice={productPrice}
          expireable={expireable}
          name={name}
          unit={unit}
        />
      </>
    );
  }
}

export default ShowProducts;
