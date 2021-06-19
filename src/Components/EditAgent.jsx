import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class EditAgent extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Agent", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentId: event.target.agentId.value,
        name: event.target.name.value,
        agentType: event.target.agentType.value,
        agentCnic: event.target.agentCnic.value,
        agentAddress: event.target.agentAddress.value,
        agentSalary: event.target.agentSalary.value,
        agentPhone: event.target.agentPhone.value,
        DOJ: event.target.DOJ.value,
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
  render() {
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editAgentexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Agent
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
                    <label className="font-weight-bold">Agent ID</label>
                    <input
                      type="number"
                      name="agentId"
                      className="form-control border border-dark"
                      required
                      disabled
                      defaultValue={this.props.agentId}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Agent Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.Name}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Agent Type</label>
                    <select
                      className="form-control border border-dark"
                      name="agentType"
                      required
                      defaultValue={this.props.agentType}
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
                      required
                      maxlength="15"
                      defaultValue={this.props.agentCnic}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Agent Address</label>
                    <input
                      type="text"
                      name="agentAddress"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.agentAddress}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Agent Salary</label>
                    <input
                      type="number"
                      name="agentSalary"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.agentSalary}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Agent Phone</label>
                    <input
                      type="tel"
                      name="agentPhone"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.agentPhone}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label className="font-weight-bold">Date of Joining</label>
                    <input
                      type="datetime-local"
                      name="DOJ"
                      className="form-control border border-dark"
                      required
                      defaultValue={this.props.DOJ}
                    />
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

export default EditAgent;
