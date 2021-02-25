import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditReqProduct from "./EditReqProduct";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowReqProducts extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    products: [],
    EditProductReqShow: false,
    searchQuery: "",
  };
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/ProductRequest")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  DeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/ProductRequest/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then(
          (result) => {
            toast(result);
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
      productRequestId,
      name,
      name1,
      RequestedQuantity,
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
        <table className="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>Code</th>
              <th>Brand</th>
              <th>Quantity</th>
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
          RequestedQuantity={RequestedQuantity}
        />
      </>
    );
  }
}

export default ShowReqProducts;
