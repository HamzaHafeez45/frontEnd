import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditRoute from "../Components/EditRoute";

class ShowRoutes extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    routes: [],
    EditRouteShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/Route")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ routes: data });
      });
  };

  DeleteRoute = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Route/" + id, {
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
    const { routeId, name, name1, name2 } = this.state;

    const { length: count } = this.state.routes;

    const { pageSize, currentPage, routes: allRoutes } = this.state;

    const Routes = paginate(allRoutes, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th> ROUTE ID</th>
              <th>ROUTE TITLE</th>
              <th>CITY</th>
              <th>AREA</th>
              <th>EDIT</th>
              <th>DELETE</th>
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
