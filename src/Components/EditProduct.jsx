import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class EditProduct extends Component {
  state = {
    brands: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Product", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: event.target.productId.value,
        name: event.target.productName.value,
        productCode: event.target.productCode.value,
        productCost: event.target.productCost.value,
        productPrice: event.target.productPrice.value,
        expireable: event.target.expireable.value,
        brandId: event.target.name.value,
        unit: event.target.unit.value,
      }),
    })
      .then((res) => res.json())
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
    fetch("http://sndwebapi.spikotech.com/api/Brand")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ brands: data });
      });
  };

  render() {
    const { brands } = this.state;
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editProductexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Product
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
                    <label className="font-weight-bold">Id</label>
                    <input
                      type="number"
                      name="productId"
                      className="form-control border border-dark"
                      required
                      disabled
                      defaultValue={this.props.productId}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control border border-dark"
                      placeholder="Enter Product name"
                      required
                      defaultValue={this.props.productName}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Code</label>
                    <input
                      type="text"
                      name="productCode"
                      className="form-control border border-dark"
                      placeholder="Enter Product code"
                      required
                      defaultValue={this.props.productCode}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Cost</label>
                    <input
                      type="number"
                      name="productCost"
                      className="form-control border border-dark"
                      placeholder="Enter product Cost"
                      required
                      defaultValue={this.props.productCost}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Price</label>
                    <input
                      type="number"
                      name="productPrice"
                      className="form-control border border-dark"
                      placeholder="Enter Product Price"
                      required
                      defaultValue={this.props.productPrice}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">
                      Product Expireable
                    </label>
                    <select
                      className="form-control border border-dark"
                      name="expireable"
                      required
                      defaultValue={this.props.expireable}
                    >
                      <option>--Select Property--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Brand</label>
                    <select
                      className="form-control border border-dark"
                      name="name"
                      required
                      defaultValue={this.props.name}
                    >
                      <option>--Select Brand--</option>
                      {brands.map((brand) => (
                        <option key={brand.brandId} value={brand.brandId}>
                          {brand.productBrandName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Unit</label>
                    <input
                      type="text"
                      name="unit"
                      className="form-control border border-dark"
                      placeholder="Enter Product unit"
                      required
                      defaultValue={this.props.unit}
                    />
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

export default EditProduct;
