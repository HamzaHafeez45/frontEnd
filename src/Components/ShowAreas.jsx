import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditArea from "../Components/EditArea";

class ShowAreas extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    areas: [],
    EditAreaShow: false,
  };
  componentDidMount = () => {
    fetch("https://localhost:44331/api/Area")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ areas: data });
      });
  };

  DeleteArea = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Area/" + id, {
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
    const { areaId, name, name1 } = this.state;

    const { length: count } = this.state.areas;
    const { pageSize, currentPage, areas: allAreas } = this.state;
    const Areas = paginate(allAreas, currentPage, pageSize);

    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>AreaId</th>
              <th>Area Name</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Areas.map((area) => (
              <tr key={area.areaId}>
                <td>{area.areaId}</td>
                <td>{area.name}</td>
                <td>{area.name1}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editAreaexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditCategoryShow: true,
                        areaId: area.areaId,
                        name: area.name,
                        name1: area.name1,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteArea(area.areaId)}
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

        <EditArea
          show={this.state.EditAreaShow}
          onHide={this.EditAreaClose}
          areaId={areaId}
          name={name}
          name1={name1}
        />
      </>
    );
  }
}

export default ShowAreas;
