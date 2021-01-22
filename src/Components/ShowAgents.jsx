import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditAgent from "../Components/EditAgent";

class ShowAgents extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    agents: [],
    EditAgentShow: false,
  };
  componentDidMount = () => {
    fetch("https://localhost:44331/api/Agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };

  DeleteAgent = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Agent/" + id, {
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
      agentId,
      name,
      agentType,
      agentCnic,
      agentAddress,
      agentSalary,
      agentPhone,
      DOJ,
    } = this.state;

    const { length: count } = this.state.agents;
    const { pageSize, currentPage, agents: allAgents } = this.state;
    const Agents = paginate(allAgents, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>AGENT ID</th>
              <th>Agent Name</th>
              <th>Agent Type</th>
              <th>Agent CNIC</th>

              <th>Agent SALARY</th>
              <th>Agent Phone</th>
              <th>Date of Joining</th>
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

                <td>{agent.agentSalary}</td>
                <td>{agent.agentPhone}</td>
                <td>{agent.DOJ}</td>
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
        />
      </>
    );
  }
}

export default ShowAgents;
