import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddDistribution extends Component {
  state = {
    cities: [],
    categories: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Distribution", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        distributionId: null,
        name: event.target.name.value,
        categoryId: event.target.categoryId.value,
        distributorName: event.target.distributorName.value,
        distributorEmail: event.target.distributorEmail.value,
        distributorCnic: event.target.distributorCnic.value,
        distributorPhone: event.target.distributorPhone.value,
        cityId: event.target.cityId.value,
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
    this.Cities();
    this.Categories();
  };

  Cities = () => {
    fetch("http://sndwebapi.spikotech.com/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };

  Categories = () => {
    fetch("http://sndwebapi.spikotech.com/api/Categories")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };

  componentDidUpdate = () => {
    this.Categories();
    this.Cities();
  };
  render() {
    const { cities, categories } = this.state;
    return (
      <>
        <Nav />
        <ToastContainer />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div className="col-xl-8 col-12 mb-4 mb-xl-0">
                  <Link
                    exact
                    className="btn btn-success btn-md"
                    to="/distributions"
                  >
                    Show Distribution
                  </Link>

                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-3">
                        <label className="font-weight-bold">
                          Distribution Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control border border-dark"
                          placeholder="Enter distribution name"
                          required
                          autoFocus
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label className="font-weight-bold">
                          Distribution Category
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
                      <div className="form-group mt-3">
                        <label className="font-weight-bold">City</label>
                        <select
                          class="form-control border border-dark"
                          name="cityId"
                        >
                          <option>--Select City--</option>
                          {cities.map((city) => (
                            <option key={city.cityId} value={city.cityId}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2 ">
                        <label className="font-weight-bold">
                          Distributor Name (Holder/Owner)
                        </label>
                        <input
                          type="text"
                          name="distributorName"
                          className="form-control border border-dark"
                          placeholder="Enter distributor name"
                          required
                        />
                      </div>
                      <div className="form-group mt-2 ">
                        <label className="font-weight-bold">
                          Distributor Email
                        </label>
                        <input
                          type="email"
                          name="distributorEmail"
                          className="form-control border border-dark"
                          placeholder="Enter distributor Email"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Distributor Cnic
                        </label>
                        <input
                          type="text"
                          name="distributorCnic"
                          className="form-control border border-dark"
                          placeholder="Enter distributor Cnic"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Distributor Phone
                        </label>
                        <input
                          type="phone"
                          name="distributorPhone"
                          className="form-control border border-dark"
                          placeholder="Enter distributor Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add-dist"
                        className="btn btn-primary  btn-lg mt-4 btn-register"
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

export default AddDistribution;
