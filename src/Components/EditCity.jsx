import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class EditCity extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/City", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityId: event.target.cityId.value,
        name: event.target.name.value,
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
          id="editCityexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit City
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
                        name="cityId"
                        className="form-control border border-dark"
                        required
                        disabled
                        defaultValue={this.props.cityId}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">City Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter distribution name"
                        required
                        defaultValue={this.props.name}
                      />
                    </div>
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

export default EditCity;
