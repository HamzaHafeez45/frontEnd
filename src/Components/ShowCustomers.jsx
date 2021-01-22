import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditShop from "../Components/EditShop";
class ShowCustomers extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    customers: [],
    EditCustomerShow: false,
  };
  componentWillMount = () => {
    fetch("https://localhost:44331/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ customers: data });
      });
  };

  DeleteStudent = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Shop/" + id, {
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
    const { shopId, name, shopCnic, shopPhone, name1, name2 } = this.state;

    const { length: count } = this.state.customers;
    const { pageSize, currentPage, customers: allCustomers } = this.state;
    const Customers = paginate(allCustomers, currentPage, pageSize);

    return (
      <>
        <table class="table table-striped bg-light text-center">
          <thead>
            <tr class="text-muted">
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer CNIC</th>
              <th>Customer Phone</th>
              <th>City</th>
              <th>Area</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {Customers.map((shop) => (
              <tr key={shop.shopId}>
                <td>{shop.shopId}</td>
                <td>{shop.name}</td>
                <td>{shop.shopCnic}</td>
                <td>{shop.shopPhone}</td>
                <td>{shop.name1}</td>
                <td>{shop.name2}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editCustomerexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditCustomerShow: true,
                        shopId: shop.shopId,
                        name: shop.name,
                        shopCnic: shop.shopCnic,
                        shopPhone: shop.shopPhone,
                        City_ID: shop.City_ID,
                        Area_ID: shop.Area_ID,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteStudent(shop.shopId)}
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

        <EditShop
          show={this.state.EditCustomerShow}
          onHide={this.EditCustomerClose}
          shopId={shopId}
          name={name}
          shopCnic={shopCnic}
          shopPhone={shopPhone}
          City_ID={name1}
          Area_ID={name2}
        />
      </>
    );
  }
}

export default ShowCustomers;
