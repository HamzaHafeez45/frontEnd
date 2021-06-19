import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class EditBrand extends Component {
  state = {
    categories: [],
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/Brand", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandId: event.target.brandId.value,
        name: event.target.productBrandName.value,
        categoryId: event.target.categoryName.value,
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
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Categories")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };
  render() {
    const { categories } = this.state;
    return (
      <>
        <ToastContainer />
        <div
          class="modal fade"
          id="editBrandexampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Brand
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
                        type="number"
                        name="brandId"
                        className="form-control border border-dark"
                        required
                        disabled
                        defaultValue={this.props.brandId}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Brand Name</label>
                      <input
                        type="text"
                        name="productBrandName"
                        className="form-control border border-dark"
                        placeholder="Enter brand name"
                        required
                        defaultValue={this.props.productBrandName}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Category</label>
                      <select
                        className="form-control border border-dark"
                        name="categoryName"
                        required
                        defaultValue={this.props.categoryName}
                      >
                        <option>--Select Category--</option>
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.name}
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

export default EditBrand;
