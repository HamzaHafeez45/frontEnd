import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditBrand from "./EditBrand";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowBrands extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    brands: [],
    EditBrandShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Brand")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ brands: data });
      });
  };

  DeleteBrand = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Brand/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  render() {
    const {
      brandId,
      name,
      name1,
      pageSize,
      currentPage,
      brands: allBrands,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.brands;
    let filtered = allBrands;
    if (searchQuery)
      filtered = allBrands.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Brands = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Brands.map((brand) => (
              <tr key={brand.brandId}>
                <td>{brand.brandId}</td>
                <td>{brand.name}</td>
                <td>{brand.name1}</td>
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
                        name1: brand.name1,
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
          name1={name1}
        />
      </>
    );
  }
}

export default ShowBrands;
