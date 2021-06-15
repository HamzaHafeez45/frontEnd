import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddBrand extends Component {
  state = {
    categories: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Brand", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandId: null,
        name: event.target.name.value,
        categoryId: event.target.categoryId.value,
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
    fetch("http://sndwebapi.spikotech.com/api/Categories")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };
  render() {
    const { categories } = this.state;
    return (
      <>
        <Nav />
        <ToastContainer />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row ">
                <div className="col-xl-1 col-12 mb-xl-0"></div>
                <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/brand">
                    Show Brands
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Brand Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter brand name"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Category</label>
                      <select
                        class="form-control border border-dark"
                        name="categoryId"
                      >
                        <option>--Select Category--</option>
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-primary px-5 btn-lg mt-4 btn-register"
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

export default AddBrand;
