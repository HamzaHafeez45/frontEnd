import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";

class AddStock extends Component {
  state = {
    products: [],
    warehouses: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Stock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: null,
        productId: event.target.productId.value,
        productQuantity: event.target.productQuantity.value,
        warehouseId: event.target.warehouseId.value,
      }),
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
  };

  componentDidMount = () => {
    this.Products();
    this.Warehouses();
  };

  Products = () => {
    fetch("https://localhost:44331/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  Warehouses = () => {
    fetch("https://localhost:44331/api/warehouse")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ warehouses: data });
      });
  };

  componentDidUpdate = () => {
    this.Products();
    this.Warehouses();
  };

  render() {
    const { products, warehouses } = this.state;
    return (
      <>
        <Nav />
        <div class="container-fluid mt-5">
          <div class="row mb-5">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div class="col-xl-4 col-12 mb-4 ml-5 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/product">
                    Show Stock
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Product</label>
                      <select
                        className="form-control border border-dark"
                        name="productId"
                      >
                        <option>--Select Product--</option>
                        {products.map((product) => (
                          <option
                            key={product.productId}
                            value={product.productId}
                          >
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Product Quantity
                      </label>
                      <input
                        type="text"
                        name="productQuantity"
                        className="form-control border border-dark"
                        placeholder="Enter product quantity"
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Warehouse</label>
                      <select
                        className="form-control border border-dark"
                        name="warehouseId"
                      >
                        <option>--Select Warehouse--</option>
                        {warehouses.map((warehouse) => (
                          <option
                            key={warehouse.warehouseId}
                            value={warehouse.warehouseId}
                          >
                            {warehouse.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-primary  btn-lg mt-4 btn-register"
                    >
                      Add
                    </button>
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

export default AddStock;
