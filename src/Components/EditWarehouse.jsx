import React, { Component } from "react";

class EditWarehouse extends Component {
  state = {
    distributions: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/warehouse", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        warehouseId: event.target.warehouseId.value,
        name: event.target.name.value,
        distributionId: event.target.name1.value,
      }),
    })
      .then((res) => res.json())
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
    fetch("https://localhost:44331/api/Distribution")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ distributions: data });
      });
  };

  render() {
    const { distributions } = this.state;
    return (
      <>
        <div
          class="modal fade"
          id="editWarehouseexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Warehouse
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
                        name="warehouseId"
                        className="form-control border border-dark"
                        required
                        disabled
                        defaultValue={this.props.warehouseId}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Warehouse Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter Warehouse name"
                        required
                        defaultValue={this.props.name}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">
                        Distribution Category
                      </label>
                      <select
                        className="form-control border border-dark"
                        name="name1"
                        defaultValue={this.props.name1}
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

export default EditWarehouse;
