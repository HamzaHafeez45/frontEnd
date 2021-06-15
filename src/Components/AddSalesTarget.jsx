import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AddSalesTarget extends Component {
  state = {
    agents: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/SalesTarget", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salesTargetId: null,
        agentId: event.target.agentId.value,
        startDate: event.target.startDate.value,
        endDate: event.target.endDate.value,
        targetOrders: event.target.targetOrders.value,
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
    fetch("http://sndwebapi.spikotech.com/api/Agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };

  render() {
    const { agents } = this.state;
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
                    to="/salesTarget"
                  >
                    Show All Targets
                  </Link>

                  <form className="mt-5 row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">Agent</label>
                        <select
                          class="form-control border border-dark"
                          name="agentId"
                        >
                          <option>--Select Agent--</option>
                          {agents.map((agent) => (
                            <option key={agent.agerntId} value={agent.agentId}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-2 ">
                        <label className="font-weight-bold">
                          Target Orders
                        </label>
                        <input
                          type="number"
                          name="targetOrders"
                          className="form-control border border-dark"
                          placeholder="Enter distributor name"
                          required
                          min="1"
                          max=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-4 mb-xl-0">
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">start Date</label>
                        <input
                          type="datetime-local"
                          name="startDate"
                          className="form-control border border-dark"
                          required
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label className="font-weight-bold">End Date</label>
                        <input
                          type="datetime-local"
                          name="endDate"
                          className="form-control border border-dark"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                      <button
                        type="submit"
                        name="add-dist"
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

export default AddSalesTarget;
