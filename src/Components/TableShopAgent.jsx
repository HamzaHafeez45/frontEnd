import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";
import EditShop from "./EditShop";
import SearchBox from "./SearchBox";
class ShowAgentShops extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    assignShops: [],
    EditCustomerShow: false,
    searchQuery: "",
  };
  componentWillMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/AssignShop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ assignShops: data });
      });
  };

  DeleteStudent = (id) => {
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
      pageSize,
      currentPage,
      assignShops: allAssignShops,
      searchQuery,
    } = this.state;

    let filtered = allAssignShops;
    if (searchQuery)
      filtered = allAssignShops.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const assignedShops = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <table class="table table-striped bg-light text-center w-100 mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Agent</th>
              <th>Shop</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {assignedShops.map((as) => (
              <tr key={as.assignShopId}>
                <td>{as.assignShopId}</td>
                <td>{as.Agent}</td>
                <td>{as.Shop}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteStock(as.assignShopId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ShowAgentShops;
