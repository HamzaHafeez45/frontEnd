import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
class AddCustomer extends Component {
  state = {
    cities: [],
    areas: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Shop", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: null,
        name: event.target.name.value,
        shopCnic: event.target.shopCnic.value,
        shopPhone: event.target.shopPhone.value,
        cityId: event.target.cityId.value,
        areaId: event.target.areaId.value,
      }),
    })
      .then((Response) => Response.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  };
  componentWillMount = () => {
    this.refreshList();
    this.refreshList1();
  };
  refreshList = () => {
    fetch("https://localhost:44331/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };
  refreshList1 = () => {
    fetch("https://localhost:44331/api/Area")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ areas: data });
      });
  };

  componentDidUpdate = () => {
    this.refreshList();
    this.refreshList1();
  };

  render() {
    const { cities, areas } = this.state;
    return (
      <>
        <Nav />
        <div class="container-fluid mt-5">
          <div class="row mb-5">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link
                    exact
                    className="btn btn-success btn-md"
                    to="/customers"
                  >
                    Show Customer
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Customer Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter customer name"
                        required
                      />
                    </div>

                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Customer Cnic</label>
                      <input
                        type="text"
                        name="shopCnic"
                        className="form-control border border-dark"
                        placeholder="Enter customer cnic"
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Customer Contact
                      </label>
                      <input
                        type="text"
                        name="shopPhone"
                        className="form-control border border-dark"
                        placeholder="Enter customer contact"
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
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
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Area</label>
                      <select
                        class="form-control border border-dark"
                        name="areaId"
                      >
                        <option>--Select Area--</option>
                        {areas.map((area) => (
                          <option key={area.areaId} value={area.areaId}>
                            {area.name}
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

export default AddCustomer;
