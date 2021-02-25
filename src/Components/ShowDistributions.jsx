import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditDistribution from "./EditDistribution";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowDistributions extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    distributions: [],
    EditDistributionShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Distribution")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ distributions: data });
      });
  };

  DeleteDistribution = (id) => {
    if (window.confirm("Are you sure?" + id)) {
      fetch("http://sndwebapi.spikotech.com/api/Distribution/" + id, {
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
      distributionId,
      name,
      name1,
      name2,
      distributorName,
      distributorEmail,
      distributorCnic,
      distributorPhone,
      pageSize,
      currentPage,
      distributions: allDistributions,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.distributions;

    let filtered = allDistributions;
    if (searchQuery)
      filtered = allDistributions.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Distributions = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table className="table table-striped bg-light text-center mt-4">
          <thead>
            <tr className="text-muted">
              <th>Id</th>
              <th> Name</th>
              <th>Category</th>
              <th>City</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Cnic</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Distributions.map((distribution) => (
              <tr key={distribution.distributionId}>
                <td>{distribution.distributionId}</td>
                <td>{distribution.name}</td>
                <td>{distribution.name1}</td>
                <td>{distribution.name2}</td>
                <td>{distribution.distributorName}</td>
                <td>{distribution.distributorEmail}</td>
                <td>{distribution.distributorCnic}</td>
                <td>{distribution.distributorPhone}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editDistributionexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditDistributionShow: true,
                        distributionId: distribution.distributionId,
                        name: distribution.name,
                        name1: distribution.name1,
                        name2: distribution.name2,
                        distributorName: distribution.distributorName,
                        distributorEmail: distribution.distributorEmail,
                        distributorCnic: distribution.distributorCnic,
                        distributorPhone: distribution.distributorPhone,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      this.DeleteDistribution(distribution.distributionId)
                    }
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

        <EditDistribution
          show={this.state.EditDistibutionShow}
          onHide={this.EditDistributionClose}
          distributionId={distributionId}
          name={name}
          name1={name1}
          name2={name2}
          distributorName={distributorName}
          distributorEmail={distributorEmail}
          distributorCnic={distributorCnic}
          distributorPhone={distributorPhone}
        />
      </>
    );
  }
}

export default ShowDistributions;
