import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import Pagination from "../Components/Pagination";
import SearchBox from "../Components/SearchBox";
import { paginate } from "../utils/Pagination";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class AddOrder extends Component {
  state = {
    products: [],
    quantity: 0,
    orderedProducts: [],
    cartProducts: [],
    pageSize: 7,
    currentPage: 1,
    shops: [],
    agents: [],
    totalAmount: 0,
    totalProfit: 0,
    searchQuery: "",
  };

  componentDidMount = () => {
    this.agents();
    this.shops();
    this.products();
  };

  agents = () => {
    fetch("http://sndwebapi.spikotech.com/api/agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };
  shops = () => {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ shops: data });
      });
  };
  products = () => {
    fetch("http://sndwebapi.spikotech.com/api/product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
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
      toast.error("already added");
    } else {
      let orderedProducts = [...this.state.orderedProducts];
      product = { quantity: this.state.quantity, ...product };
      orderedProducts = [...orderedProducts, { product }];
      this.setState({ orderedProducts });
      let cartProducts = [...this.state.cartProducts];
      cartProducts = [
        ...cartProducts,
        {
          productId: product.productId,
          quantity: product.quantity,
          productPrice: product.productPrice,
        },
      ];
      this.setState({ cartProducts });
    }
  };
  deleteProduct = (id) => {
    const orderedProducts = this.state.orderedProducts.filter(
      (x) => x.product.productId !== id
    );
    this.setState({ orderedProducts });

    const cartProducts = this.state.cartProducts.filter(
      (x) => x.productId !== id
    );
    this.setState({ cartProducts });
  };
  calculateAmmount = () => {
    const { orderedProducts } = this.state;
    const totalAmount = orderedProducts.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.product.productPrice * currentValue.product.quantity,
      0
    );

    return totalAmount;
  };
  calculateProfit = () => {
    const { orderedProducts } = this.state;
    const totalProfit = orderedProducts.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.product.productPrice - currentValue.product.productCost) *
          currentValue.product.quantity,
      0
    );

    return totalProfit;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.orderedProducts);

    fetch("http://sndwebapi.spikotech.com/api/Order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: null,
        shopId: event.target.shopId.value,
        agentId: event.target.agentId.value,
        orderedProducts: this.state.cartProducts,
        totalAmount: this.state.totalAmount,
        totalProfit: this.state.totalProfit,
        orderDate: event.target.orderDate.value,
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
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
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
      searchQuery,
    } = this.state;
    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const products = paginate(filtered, currentPage, pageSize);
    this.state.totalAmount = this.calculateAmmount();
    this.state.totalProfit = this.calculateProfit();
    return (
      <>
        <Nav />
        <ToastContainer />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div className="col-xl-10 col-12 mb-4 mb-xl-0">
                  <Link className="btn btn-success btn-md" to="/order">
                    Show Orders
                  </Link>

                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-4 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Customer</label>
                        <select
                          className="form-control border border-dark"
                          name="shopId"
                          required
                          autoFocus
                        >
                          <option>--Select Customer--</option>
                          {shops.map((shop) => (
                            <option key={shop.shopId} value={shop.shopId}>
                              {shop.shopName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent</label>
                        <select
                          className="form-control border border-dark"
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
                    <div className="col-md-4 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Order Date</label>
                        <input
                          type="datetime-local"
                          name="orderDate"
                          className="form-control border border-dark"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0 mt-5">
                      <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                      />
                      <table className="table table-striped bg-light text-center">
                        <thead>
                          <tr class="text-muted">
                            <th>Name</th>
                            <th>Price</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Add</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.productId}>
                              <td>{product.name}</td>
                              <td>{product.productPrice}</td>
                              <td>{product.unit}</td>
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
                      <h2 className="text-center mb-3">
                        <strong>Your Cart</strong>
                        <span className="text-light bg-secondary badge ml-2">
                          {orderedProducts.length}
                        </span>
                      </h2>
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
                          <div className="row">
                            <div className="col-sm-6">Total Amount</div>
                            <div className="col-sm-6 text-right font-weight-bold">
                              Rs:{this.state.totalAmount}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add-dist"
                        className="btn btn-primary px-5 btn-lg mt-4 btn-register"
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
