import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditAgent from "./EditAgent";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowAgents extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    agents: [],
    EditAgentShow: false,
    searchQuery: "",
  };
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };

  DeleteAgent = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Agent/" + id, {
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
              let agents = this.state.agents.filter((m) => m.agentId !== id);
              this.setState({ agents });
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
      agentId,
      name,
      agentType,
      agentCnic,
      agentAddress,
      agentSalary,
      agentPhone,
      DOJ,
      IEMI,
      pageSize,
      currentPage,
      agents: allAgents,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.agents;

    let filtered = allAgents;
    if (searchQuery)
      filtered = allAgents.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Agents = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center w-100 mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Cnic</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>Date of Joining</th>
              <th>IEMI</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Agents.map((agent) => (
              <tr key={agent.agentId}>
                <td>{agent.agentId}</td>
                <td>{agent.name}</td>
                <td>{agent.agentType}</td>
                <td>{agent.agentCnic}</td>
                <td>{agent.agentAddress}</td>
                <td>{agent.agentSalary}</td>
                <td>{agent.agentPhone}</td>
                <td>{agent.DOJ.slice(0, 10)}</td>
                <td>{agent.IEMI}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editAgentexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditAgentShow: true,
                        agentId: agent.agentId,
                        name: agent.name,
                        agentType: agent.agentType,
                        agentCnic: agent.agentCnic,
                        agentAddress: agent.agentAddress,
                        agentSalary: agent.agentSalary,
                        agentPhone: agent.agentPhone,
                        DOJ: agent.DOJ,
                        IEMI: agent.IEMI,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteAgent(agent.agentId)}
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

        <EditAgent
          show={this.state.EditAgentShow}
          onHide={this.EditAgentClose}
          agentId={agentId}
          name={name}
          agentType={agentType}
          agentCnic={agentCnic}
          agentAddress={agentAddress}
          agentSalary={agentSalary}
          agentPhone={agentPhone}
          DOJ={DOJ}
          IEMI={IEMI}
        />
      </>
    );
  }
}

export default ShowAgents;
