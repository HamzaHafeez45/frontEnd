import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer, toast } from "react-toastify";

class AddAgent extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Agent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentId: null,
        name: event.target.name.value,
        agentType: event.target.agentType.value,
        agentCnic: event.target.agentCnic.value,
        agentAddress: event.target.agentAddress.value,
        agentSalary: event.target.agentSalary.value,
        agentPhone: event.target.agentPhone.value,
        DOJ: event.target.DOJ.value,
        IEMI: event.target.IEMI.value,
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
              <div className="row">
                <div className="col-xl-1 col-12 mb-xl-0"></div>
                <div className="col-xl-8 col-12 mb-4 mb-xl-0">
                  <Link exact className="btn btn-success btn-md" to="/agents">
                    Show Agents
                  </Link>
                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control border border-dark"
                          placeholder="Enter agent name"
                          required
                          autoFocus
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent Type</label>
                        <select
                          className="form-control border border-dark"
                          name="agentType"
                          required
                        >
                          <option>--Select AgentType--</option>
                          <option value="SalesMan">SalesMan</option>
                          <option value="DelieveryMan">DelieveryMan</option>
                          <option value="Cashier">Cashier</option>
                        </select>
                      </div>

                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent CNIC</label>
                        <input
                          type="text"
                          name="agentCnic"
                          className="form-control border border-dark"
                          placeholder="Enter agent cnic"
                          maxlength="15"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Agent Address
                        </label>
                        <input
                          type="text"
                          name="agentAddress"
                          className="form-control border border-dark"
                          placeholder="Enter agent address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent Salary</label>
                        <input
                          type="number"
                          name="agentSalary"
                          className="form-control border border-dark"
                          placeholder="Enter agent salary"
                          required
                        />
                      </div>

                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent Phone</label>
                        <input
                          type="tel"
                          name="agentPhone"
                          className="form-control border border-dark"
                          placeholder="Enter agent phone"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Agent Phone IEMI
                        </label>
                        <input
                          type="text"
                          name="IEMI"
                          className="form-control border border-dark"
                          placeholder="Enter agent phone IEMI"
                          maxlength="15"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">
                          Date of Joining
                        </label>
                        <input
                          type="datetime-local"
                          name="DOJ"
                          className="form-control border border-dark"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add"
                        className="btn btn-primary px-5 btn-lg mt-4 btn-register"
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

export default AddAgent;
