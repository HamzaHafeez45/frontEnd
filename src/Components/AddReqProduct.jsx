import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddReqProduct extends Component {
  state = {
    products: [],
    brands: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/ProductRequest", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productRequestId: null,
        productId: event.target.productId.value,
        brandId: event.target.brandId.value,
        requestedQuantity: event.target.requestedQuantity.value,
        purchaseDate: event.target.purchaseDate.value,
      }),
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
  };

  componentDidMount = () => {
    this.Products();
    this.Brands();
  };

  Products = () => {
    fetch("http://sndwebapi.spikotech.com/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  Brands = () => {
    fetch("http://sndwebapi.spikotech.com/api/Brand")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ brands: data });
      });
  };

  render() {
    const { products, brands } = this.state;
    return (
      <>
        <Nav />
        <ToastContainer />
        <div class="container-fluid mt-5">
          <div class="row mb-5">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div class="col-xl-8 col-12 mb-4 mb-xl-0">
                  <Link
                    exact
                    className="btn btn-success btn-md"
                    to="/requestproduct"
                  >
                    Purchased Products
                  </Link>
                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Product</label>
                        <select
                          className="form-control border border-dark"
                          name="productId"
                          required
                          autoFocus
                        >
                          <option>--Select Product--</option>
                          {products.map((product) => (
                            <option
                              key={product.productId}
                              value={product.productId}
                            >
                              {product.productName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Brand</label>
                        <select
                          className="form-control border border-dark"
                          name="brandId"
                          required
                        >
                          <option>--Select Brand--</option>
                          {brands.map((brand) => (
                            <option key={brand.brandId} value={brand.brandId}>
                              {brand.productBrandName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Product Quantity
                        </label>
                        <input
                          type="number"
                          name="requestedQuantity"
                          className="form-control border border-dark"
                          placeholder="Enter product quantity"
                          min="1"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Date of Joining
                        </label>
                        <input
                          type="datetime-local"
                          name="purchaseDate"
                          className="form-control border border-dark"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add"
                        className="btn btn-primary btn-lg mt-4 btn-register"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddReqProduct;
