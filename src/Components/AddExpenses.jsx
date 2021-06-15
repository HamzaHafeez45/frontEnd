import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddExpenses extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Expense", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expenseId: null,
        description: event.target.description.value,
        ammount: event.target.ammount.value,
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
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row ">
                <div className="col-xl-1 col-12 mb-xl-0"></div>
                <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/expenses">
                    Show Expenses
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Description</label>
                      <input
                        type="text"
                        name="description"
                        className="form-control border border-dark"
                        placeholder="Enter Expense Description"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Ammount</label>
                      <input
                        type="text"
                        name="ammount"
                        className="form-control border border-dark"
                        placeholder="Enter Expense Ammount"
                        required
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

export default AddExpenses;
