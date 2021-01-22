import React, { Component } from "react";

class EditReqProduct extends Component {
  state = {
    products: [],
    brands: [],
    categories: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/ProductRequest", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productRequestId: event.target.productRequestId.value,
        productId: event.target.name.value,
        brandId: event.target.name1.value,
        categoryId: event.target.name2.value,
        requestedQuantity: event.target.requestedQuantity.value,
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
    this.Products();
    this.Categories();
    this.Brands();
  };

  Products = () => {
    fetch("https://localhost:44331/api/Product")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ products: data });
      });
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
    const { products, brands, categories } = this.state;
    return (
      <>
        <div
          class="modal fade"
          id="editProductReqexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Product Request
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
                      name="productRequestId"
                      className="form-control border border-dark"
                      required
                      disabled
                      defaultValue={this.props.productRequestId}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product</label>
                    <select
                      className="form-control border border-dark"
                      name="name"
                      defaultValue={this.props.name}
                    >
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
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Product Quantity</label>
                    <input
                      type="text"
                      name="requestedQuantity"
                      className="form-control border border-dark"
                      placeholder="Enter product quantity"
                      required
                      defaultValue={this.props.requestedQuantity}
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

export default EditReqProduct;
