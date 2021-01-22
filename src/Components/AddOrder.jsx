import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";

class AddOrder extends Component {
  state = {
    products: [],
    quantity: 0,
    orderedProducts: [],
    pageSize: 4,
    currentPage: 1,
    shops: [],
    agents: [],
    totalAmmount: "",
  };

  componentDidMount = () => {
    this.agents();
    this.shops();
    this.products();
  };

  agents = () => {
    fetch("https://localhost:44331/api/agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };
  shops = () => {
    fetch("https://localhost:44331/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ shops: data });
      });
  };
  products = () => {
    fetch("https://localhost:44331/api/product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };
  componentDidUpdate = () => {
    this.agents();
    this.shops();
    this.products();
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleChange = (e) => {
    this.setState({ quantity: e.currentTarget.value });
  };
  addProduct = (product) => {
    const exists = this.state.orderedProducts.find(
      (x) => x.product.productId === product.productId
    );
    if (exists) {
      alert("already added");
    } else {
      let orderedProducts = [...this.state.orderedProducts];
      product = { quantity: this.state.quantity, ...product };
      orderedProducts = [...this.state.orderedProducts, { product }];
      this.setState({ orderedProducts });
      console.log(orderedProducts);
    }
  };
  deleteProduct = (id) => {
    const orderedProducts = this.state.orderedProducts.filter(
      (x) => x.product.productId !== id
    );
    this.setState({ orderedProducts });
  };
  doSomething = () => {
    const { orderedProducts } = this.state;
    const totalAmmount = orderedProducts.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.product.productPrice * currentValue.product.quantity,
      0
    );

    return totalAmmount;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Order", {
      method: "POST",
      async: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: null,
        shopId: event.target.shopId.value,
        agentId: event.target.agentId.value,
        orderedProducts: this.state.orderedProducts,
        totalAmmount: this.state.totalAmmount,
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

  render() {
    const { length: count } = this.state.products;
    const {
      pageSize,
      currentPage,
      orderedProducts,
      products: allProducts,
      shops,
      agents,
    } = this.state;
    const products = paginate(allProducts, currentPage, pageSize);
    this.state.totalAmmount = this.doSomething();
    return (
      <>
        <Nav />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div className="col-xl-8 col-12 mb-4 mb-xl-0">
                  <Link className="btn btn-success btn-md" to="/distributions">
                    Show Distribution
                  </Link>

                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-4 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Customer</label>
                        <select
                          class="form-control border border-dark"
                          name="shopId"
                          required
                          autoFocus
                        >
                          <option>--Select Customer--</option>
                          {shops.map((shop) => (
                            <option key={shop.shopId} value={shop.shopId}>
                              {shop.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent</label>
                        <select
                          class="form-control border border-dark"
                          name="agentId"
                          required
                        >
                          <option>--Select Agent--</option>
                          {agents.map((agent) => (
                            <option key={agent.agentId} value={agent.agentId}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 col-12 mb-4 mb-xl-0 mt-5">
                      <table className="table table-striped bg-light text-center">
                        <thead>
                          <tr class="text-muted">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Add</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.productId}>
                              <td>{product.productId}</td>
                              <td>{product.name}</td>
                              <td>{product.productPrice}</td>
                              <td>
                                <input
                                  className="form-control border border-dark"
                                  type="number"
                                  name="quantity"
                                  onChange={this.handleChange}
                                  min="1"
                                  max=""
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={() => this.addProduct(product)}
                                >
                                  Add
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
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0 mt-5 bg-">
                      {orderedProducts.length !== 0 && (
                        <table className="table text-center">
                          <thead>
                            <tr class="text-muted">
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderedProducts.map((op) => (
                              <tr key={op.product.productId}>
                                <td>{op.product.name}</td>
                                <td>{op.product.quantity}</td>
                                <td>
                                  {op.product.quantity *
                                    op.product.productPrice}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      this.deleteProduct(op.product.productId)
                                    }
                                  >
                                    <i
                                      className="fa fa-times p-1"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {orderedProducts.length !== 0 && (
                        <>
                          <hr />
                          <div className="row">
                            <div className="col-sm-6">Total Ammount</div>
                            <div className="col-sm-6 text-right font-weight-bold">
                              ${this.state.totalAmmount}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add-dist"
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

export default AddOrder;
