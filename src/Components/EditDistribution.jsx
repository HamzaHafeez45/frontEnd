import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class EditDistribution extends Component {
  state = {
    categories: [],
    cities: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Distribution", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        distributionId: event.target.distributionId.value,
        name: event.target.name.value,
        categoryId: event.target.name1.value,
        distributorName: event.target.distributorName.value,
        distributorEmail: event.target.distributorEmail.value,
        distributorCnic: event.target.distributorCnic.value,
        distributorPhone: event.target.distributorPhone.value,
        cityId: event.target.name2.value,
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

  render() {
    const { cities, categories } = this.state;
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editDistributionexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Distribution
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
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Id</label>
                      <input
                        type="text"
                        name="distributionId"
                        className="form-control border border-dark"
                        required
                        disabled
                        defaultValue={this.props.distributionId}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Distribution Name
                      </label>
                      <input
                        type="text"
                        name="ame"
                        className="form-control border border-dark"
                        placeholder="Enter distribution name"
                        required
                        defaultValue={this.props.name}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Distribution Category
                      </label>
                      <select
                        class="form-control border border-dark"
                        name="name1"
                        defaultValue={this.props.name1}
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
                      <label className="font-weight-bold">City</label>
                      <select
                        class="form-control border border-dark"
                        name="name2"
                        defaultValue={this.props.name2}
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
                      defaultValue={this.props.distributorName}
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
                      defaultValue={this.props.distributorEmail}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Distributor Cnic</label>
                    <input
                      type="text"
                      name="distributorCnic"
                      className="form-control border border-dark"
                      placeholder="Enter distributor Cnic"
                      required
                      defaultValue={this.props.distributorCnic}
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
                      defaultValue={this.props.distributorPhone}
                    />
                  </div>

                  <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                    <button
                      type="submit"
                      name="add-dist"
                      className="btn btn-primary  btn-lg mt-4 btn-register"
                    >
                      Update
                    </button>
                  </div>
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

export default EditDistribution;
