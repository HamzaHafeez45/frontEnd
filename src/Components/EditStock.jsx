import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class EditStock extends Component {
  state = {
    products: [],
    warehouses: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Stock", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: event.target.stockId.value,
        productId: event.target.productName.Value,
        productQuantity: event.target.productQuantity.Value,
        warehouseId: event.target.warehouseName.value,
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
    this.Warehouses();
  };

  Products = () => {
    fetch("http://sndwebapi.spikotech.com/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  };

  Warehouses = () => {
    fetch("http://sndwebapi.spikotech.com/api/warehouse")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ warehouses: data });
      });
  };

  render() {
    const { products, warehouses } = this.state;
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editStockexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Route
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="Signup-form" onSubmit={this.handleSubmit}>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Stock ID</label>
                    <input
                      type="number"
                      name="stockId"
                      className="form-control border border-dark"
                      required
                      disabled
                      defaultValue={this.props.stockId}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product</label>
                    <select
                      className="form-control border border-dark"
                      name="productName"
                      required
                      defaultValue={this.props.productName}
                    >
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
                    <label className="font-weight-bold">Product Quantity</label>
                    <input
                      type="number"
                      name="productQuantity"
                      className="form-control border border-dark"
                      placeholder="Enter product quantity"
                      min="1"
                      required
                      defaultValue={this.props.productQuantity}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Warehouse</label>
                    <select
                      className="form-control border border-dark"
                      name="warehouseName"
                      required
                      defaultValue={this.props.warehouseName}
                    >
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.warehouseId}
                          value={warehouse.warehouseId}
                        >
                          {warehouse.warehouseName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    name="update"
                    className="btn btn-primary  btn-lg mt-4 btn-register"
                  >
                    Update
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.props.onHide}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditStock;
