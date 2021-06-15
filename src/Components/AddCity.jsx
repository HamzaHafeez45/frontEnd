import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddCity extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/City", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityId: null,
        name: event.target.name.value,
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
  render() {
    return (
      <>
        <Nav />
        <ToastContainer />
        <div class="container-fluid mt-5">
          <div class="row mb-5">
            <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div class="row ">
                <div className="col-xl-1 col-12 mb-xl-0"></div>
                <div class="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/cities">
                    Show Cities
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">City Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter city name"
                        required
                        autoFocus
                      />
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

export default AddCity;
