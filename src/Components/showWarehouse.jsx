import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditWarehouse from "./EditWarehouse";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";

class ShowWarehouse extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    warehouses: [],
    EditWarehouseShow: false,
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/warehouse")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ warehouses: data });
      });
  };

  DeleteWarehouse = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/warehouse/" + id, {
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
              let allWarehouses = this.state.warehouses.filter(
                (m) => m.warehouseId !== id
              );
              this.setState({ warehouses: allWarehouses });
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
    const { warehouseId, name, name1, searchQuery } = this.state;
    const { length: count } = this.state.warehouses;
    const { pageSize, currentPage, warehouses: allWarehouses } = this.state;

    let filtered = allWarehouses;
    if (searchQuery)
      filtered = allWarehouses.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Warehouses = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>WarehouseID</th>
              <th>Name</th>
              <th>Distribution</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Warehouses.map((warehouse) => (
              <tr key={warehouse.warehouseId}>
                <td>{warehouse.warehouseId}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.name1}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editWarehouseexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditWarehouseShow: true,
                        warehouseId: warehouse.warehouseId,
                        name: warehouse.name,
                        name1: warehouse.name1,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteWarehouse(warehouse.warehouseId)}
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

        <EditWarehouse
          show={this.state.EditWarehouseShow}
          onHide={this.EditWarehouseClose}
          warehouseId={warehouseId}
          name={name}
          name1={name1}
        />
      </>
    );
  }
}

export default ShowWarehouse;
