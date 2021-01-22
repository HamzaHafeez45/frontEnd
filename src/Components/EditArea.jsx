import React, { Component } from "react";

class EditArea extends Component {
  state = {
    cities: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Area", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        areaId: event.target.areaId.value,
        name: event.target.name.value,
        cityId: event.target.name1.value,
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
    fetch("https://localhost:44331/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };

  render() {
    const { cities } = this.state;
    return (
      <>
        <div
          class="modal fade"
          id="editAreaexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Area
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
                        name="areaId"
                        className="form-control border border-dark"
                        required
                        disabled
                        defaultValue={this.props.areaId}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Area Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border border-dark"
                        placeholder="Enter distribution name"
                        required
                        defaultValue={this.props.name}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">City</label>
                      <select
                        className="form-control border border-dark"
                        name="name1"
                        defaultValue={this.props.name1}
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

export default EditArea;
