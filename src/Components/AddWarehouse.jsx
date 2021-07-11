import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer, toast } from "react-toastify";

class AddWarehouse extends Component {
  state = {
    distributions: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/warehouse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        warehouseId: null,
        name: event.target.name.value,
        distributionId: event.target.distribution.value,
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
  };
  refreshList = () => {
    fetch("http://sndwebapi.spikotech.com/api/Distribution")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ distributions: data });
      });
  };

  componentDidUpdate = () => {
    this.refreshList();
  };
  render() {
    const { distributions } = this.state;
    return (
      <>
        <Nav />
        <ToastContainer />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-4 mb-xl-0"></div>
                <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link
                    exact
                    className="btn btn-success btn-md"
                    to="/warehouse"
                  >
                    Show Warehouses
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Warehouse Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter warehouse name"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Distribution Category
                      </label>
                      <select
                        className="form-control border border-dark"
                        name="distribution"
                        required
                      >
                        <option>--Select Category--</option>
                        {distributions.map((dist) => (
                          <option
                            key={dist.distributionId}
                            value={dist.distributionId}
                          >
                            {dist.name}
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

export default AddWarehouse;
