import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditDistribution from "../Components/EditDistribution";

class ShowDistributions extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    distributions: [],
    EditDistributionShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/Distribution")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ distributions: data });
      });
  };

  DeleteDistribution = (id) => {
    if (window.confirm("Are you sure?" + id)) {
      fetch("https://localhost:44331/api/Distribution/" + id, {
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
    const {
      distributionId,
      name,
      name1,
      name2,
      distributorName,
      distributorEmail,
      distributorCnic,
      distributorPhone,
    } = this.state;

    const { length: count } = this.state.distributions;

    const {
      pageSize,
      currentPage,
      distributions: allDistributions,
    } = this.state;

    const Distributions = paginate(allDistributions, currentPage, pageSize);
    return (
      <>
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr className="text-muted">
              <th>DistributionID</th>
              <th>Distribution Name</th>
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
