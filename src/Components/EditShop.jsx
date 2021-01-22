import React, { Component } from "react";

class EditShop extends Component {
  state = {
    cities: [],
    areas: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Shop", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: event.target.shopId.value,
        name: event.target.name.value,
        shopCnic: event.target.shopCnic.value,
        shopPhone: event.target.shopPhone.value,
        cityId: event.target.name1.value,
        areaId: event.target.name2.value,
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

  render() {
    const { cities, areas } = this.state;
    return (
      <>
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
                      type="text"
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
                      name="name"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.name}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Customer CNIC</label>
                    <input
                      type="text"
                      name="shopCnic"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.shopCnic}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Shop Phone</label>
                    <input
                      type="text"
                      name="shopPhone"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.shopPhone}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">City</label>
                    <select
                      class="form-control border border-dark"
                      name="name1"
                      defaultValue={this.props.name1}
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
                      name="name2"
                      defaultValue={this.props.name2}
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
