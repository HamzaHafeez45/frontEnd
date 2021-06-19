import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class EditShop extends Component {
  state = {
    cities: [],
    areas: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Shop", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: event.target.shopId.value,
        shopName: event.target.shopName.value,
        shopCnic: event.target.shopCnic.value,
        shopPhone: event.target.shopPhone.value,
        cityId: event.target.cityName.value,
        areaId: event.target.areaName.value,
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
    this.refreshList();
    this.refreshList1();
  };
  refreshList = () => {
    fetch("http://sndwebapi.spikotech.com/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };
  refreshList1 = () => {
    fetch("http://sndwebapi.spikotech.com/api/Area")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ areas: data });
      });
  };

  render() {
    const { cities, areas } = this.state;
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editCustomerexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Customer
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
                    <label className="font-weight-bold">Shop ID</label>
                    <input
                      type="number"
                      name="shopId"
                      className="form-control border border-dark"
                      disabled
                      required
                      defaultValue={this.props.shopId}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Shop Name</label>
                    <input
                      type="text"
                      name="shopName"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.shopName}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Customer CNIC</label>
                    <input
                      type="number"
                      name="shopCnic"
                      className="form-control border border-dark"
                      required
                      maxlength="15"
                      defaultValue={this.props.shopCnic}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Shop Phone</label>
                    <input
                      type="tel"
                      name="shopPhone"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.shopPhone}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">City</label>
                    <select
                      className="form-control border border-dark"
                      name="cityName"
                      required
                      defaultValue={this.props.cityName}
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
                      className="form-control border border-dark"
                      name="areaName"
                      required
                      defaultValue={this.props.areaName}
                    >
                      <option>--Select Area--</option>
                      {areas.map((area) => (
                        <option key={area.areaId} value={area.areaId}>
                          {area.areaName}
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

export default EditShop;
