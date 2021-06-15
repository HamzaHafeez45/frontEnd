import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowAssignedShop extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    assignedShops: [],
    EditBrandShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/AssignShop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ assignedShops: data });
      });
  };

  DeleteBrand = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/AssignShop/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((Response) => Response.json())
        .then(
          (result) => {
            if (result === "Deleted Successfully") {
              let assignedShops = this.state.assignedShops.filter(
                (m) => m.assignedShopId !== id
              );
              this.setState({ assignedShops });
              toast(result);
            } else {
              toast.error(result);
            }
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
      pageSize,
      currentPage,
      assignedShops: allAssignedShops,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.assignedShops;
    let filtered = allAssignedShops;
    if (searchQuery)
      filtered = allAssignedShops.filter((m) =>
        m.Agent.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const AssignedShops = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>ID</th>
              <th>Agent</th>
              <th>Shop</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {AssignedShops.map((assignShop) => (
              <tr key={assignShop.assignShopId}>
                <td>{assignShop.assignShopId}</td>
                <td>{assignShop.Agent}</td>
                <td>{assignShop.Shop}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteBrand(assignShop.assignShopId)}
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
      </>
    );
  }
}

export default ShowAssignedShop;
