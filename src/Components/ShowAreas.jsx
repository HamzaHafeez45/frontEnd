import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditArea from "./EditArea";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowAreas extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    areas: [],
    EditAreaShow: false,
    searchQuery: "",
  };
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Area")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ areas: data });
      });
  };

  DeleteArea = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Area/" + id, {
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
              let areas = this.state.areas.filter((m) => m.areaId !== id);
              this.setState({ areas });
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
      areaId,
      areaName,
      cityName,
      pageSize,
      currentPage,
      areas: allAreas,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.areas;
    let filtered = allAreas;
    if (searchQuery)
      filtered = allAreas.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Areas = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
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
                <td>{area.areaName}</td>
                <td>{area.cityName}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editAreaexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditCategoryShow: true,
                        areaId: area.areaId,
                        areaName: area.areaName,
                        cityName: area.cityName,
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
          areaName={areaName}
          cityName={cityName}
        />
      </>
    );
  }
}

export default ShowAreas;
