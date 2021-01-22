import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditWarehouse from "../Components/EditWarehouse";
class ShowWarehouse extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    warehouses: [],
    EditWarehouseShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/warehouse")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ warehouses: data });
      });
  };

  DeleteWarehouse = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/warehouse/" + id, {
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
    const { warehouseId, name, name1 } = this.state;

    const { length: count } = this.state.warehouses;

    const { pageSize, currentPage, warehouses: allWarehouses } = this.state;

    const Warehouses = paginate(allWarehouses, currentPage, pageSize);
    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>WarehouseID</th>
              <th>Warehouse Name</th>
              <th>Distribution Name</th>
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
