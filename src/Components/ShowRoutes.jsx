import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditRoute from "./EditRoute";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowRoutes extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    routes: [],
    EditRouteShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Route")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ routes: data });
      });
  };

  DeleteRoute = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Route/" + id, {
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
    const { routeId, name, name1, name2, searchQuery } = this.state;
    const { length: count } = this.state.routes;
    const { pageSize, currentPage, routes: allRoutes } = this.state;
    let filtered = allRoutes;
    if (searchQuery)
      filtered = allRoutes.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Routes = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>City</th>
              <th>Area</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Routes.map((route) => (
              <tr key={route.routeId}>
                <td>{route.routeId}</td>
                <td>{route.name}</td>
                <td>{route.name1}</td>
                <td>{route.name2}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editRouteexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditRouteShow: true,
                        routeId: route.routeId,
                        name: route.name,
                        name1: route.name1,
                        name2: route.name2,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteRoute(route.routeId)}
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

        <EditRoute
          show={this.state.EditRouteShow}
          onHide={this.EditRouteClose}
          routeId={routeId}
          name={name}
          name1={name1}
          name2={name2}
        />
      </>
    );
  }
}

export default ShowRoutes;
