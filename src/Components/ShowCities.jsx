import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditCity from "./EditCity";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowCities extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    cities: [],
    EditCityShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/City")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ cities: data });
      });
  };

  DeleteCity = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/City/" + id, {
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
              let cities = this.state.cities.filter((m) => m.cityId !== id);
              this.setState({ cities });
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
      cityId,
      name,
      pageSize,
      currentPage,
      cities: allCities,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.cities;
    let filtered = allCities;
    if (searchQuery)
      filtered = allCities.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Cities = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
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
