import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";

class AddProduct extends Component {
  state = {
    brands: [],
    categories: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: null,
        name: event.target.name.value,
        productCode: event.target.productCode.value,
        productPrice: event.target.productPrice.value,
        expireable: event.target.expireable.value,
        brandId: event.target.brandId.value,
        categoryId: event.target.categoryId.value,
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

  componentDidUpdate = () => {
    this.Categories();
    this.Brands();
  };

  render() {
    const { brands, categories } = this.state;
    return (
      <>
        <Nav />
        <div class="container-fluid mt-5">
          <div class="row mb-5">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div class="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/product">
                    Show Products
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Product Code</label>
                      <input
                        type="text"
                        name="productCode"
                        className="form-control border border-dark"
                        placeholder="Enter product code"
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Product Price</label>
                      <input
                        type="text"
                        name="productPrice"
                        className="form-control border border-dark"
                        placeholder="Enter product price"
                        required
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
                        name="brandId"
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
                      <label className="font-weight-bold">
                        Product Category
                      </label>
                      <select
                        class="form-control border border-dark"
                        name="categoryId"
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

export default AddProduct;
