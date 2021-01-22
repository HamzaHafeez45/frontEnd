import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditBrand from "../Components/EditBrand";
class ShowBrands extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    brands: [],
    EditBrandShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/Brand")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ brands: data });
      });
  };

  DeleteBrand = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Brand/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { brandId, name } = this.state;

    const { length: count } = this.state.brands;

    const { pageSize, currentPage, brands: allBrands } = this.state;

    const Brands = paginate(allBrands, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>Brand ID</th>
              <th>Brand Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Brands.map((brand) => (
              <tr key={brand.brandId}>
                <td>{brand.brandId}</td>
                <td>{brand.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editBrandexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditBrandShow: true,
                        brandId: brand.brandId,
                        name: brand.name,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteBrand(brand.brandId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />

        <EditBrand
          show={this.state.EditBrandShow}
          onHide={this.EditBrandClose}
          brandId={brandId}
          name={name}
        />
      </>
    );
  }
}

export default ShowBrands;
