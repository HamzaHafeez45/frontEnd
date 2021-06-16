import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";

class ShowSalesTarget extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    salesTargets: [],
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/SalesTarget")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ salesTargets: data });
      });
  };

  DeleteTarget = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/SalesTarget/" + id, {
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
              let salesTargets = this.state.salesTargets.filter(
                (m) => m.salesTargetId !== id
              );
              this.setState({ salesTargets });
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
      salesTargets: allSalesTargets,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.salesTargets;
    let filtered = allSalesTargets;
    if (searchQuery)
      filtered = allSalesTargets.filter((m) =>
        m.Agent.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const SalesTargets = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Agent</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Target Orders</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {SalesTargets.map((st) => (
              <tr key={st.salesTargetId}>
                <td>{st.salesTargetId}</td>
                <td>{st.Agent}</td>
                <td>{st.startDate}</td>
                <td>{st.endDate}</td>
                <td>{st.targetOrders}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteTarget(st.salesTargetId)}
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

export default ShowSalesTarget;
