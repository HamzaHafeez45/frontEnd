import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditCity from "../Components/EditCity";
class ShowCities extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    cities: [],
    EditCityShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };

  DeleteCity = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/City/" + id, {
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
    const { cityId, name } = this.state;

    const { length: count } = this.state.cities;

    const { pageSize, currentPage, cities: allCities } = this.state;

    const Cities = paginate(allCities, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>cityId</th>
              <th>City Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Cities.map((city) => (
              <tr key={city.cityId}>
                <td>{city.cityId}</td>
                <td>{city.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editCityexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditDistributionShow: true,
                        cityId: city.cityId,
                        name: city.name,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteCity(city.cityId)}
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

        <EditCity
          show={this.state.EditCityShow}
          onHide={this.EditCityClose}
          cityId={cityId}
          name={name}
        />
      </>
    );
  }
}

export default ShowCities;
