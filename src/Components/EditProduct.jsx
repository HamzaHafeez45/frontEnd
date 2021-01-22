import React, { Component } from "react";

class EditProduct extends Component {
  state = {
    brands: [],
    categories: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Product", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: event.target.productId.value,
        name: event.target.name.value,
        productCode: event.target.productCode.value,
        productPrice: event.target.productPrice.value,
        expireable: event.target.expireable.value,
        brandId: event.target.name1.value,
        categoryId: event.target.name2.value,
      }),
    })
      .then((res) => res.json())
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
    this.Categories();
    this.Brands();
  };

  Brands = () => {
    fetch("https://localhost:44331/api/Brand")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ brands: data });
      });
  };

  Categories = () => {
    fetch("https://localhost:44331/api/Categories")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };

  render() {
    const { brands, categories } = this.state;
    return (
      <>
        <div
          class="modal fade"
          id="editProductexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                      type="text"
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
                      name="name"
                      className="form-control border border-dark"
                      placeholder="Enter Product name"
                      required
                      defaultValue={this.props.name}
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
                    <label className="font-weight-bold">Product Price</label>
                    <input
                      type="text"
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
                      name="name1"
                      defaultValue={this.props.name1}
                    >
                      <option>--Select Brand--</option>
                      {brands.map((brand) => (
                        <option key={brand.brandId} value={brand.brandId}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Category</label>
                    <select
                      class="form-control border border-dark"
                      name="name2"
                      defaultValue={this.props.name2}
                    >
                      <option>--Select Category--</option>
                      {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.name}
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

export default EditProduct;
