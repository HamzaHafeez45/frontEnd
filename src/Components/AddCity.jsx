import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
class AddCity extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/City", {
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
          alert(result);
        },
        (error) => {
          alert(error);
        }
      );
  };
  render() {
    return (
      <>
        <Nav />
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
                      />
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

export default AddCity;
