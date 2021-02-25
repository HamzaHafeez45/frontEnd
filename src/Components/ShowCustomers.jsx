import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";
import EditShop from "./EditShop";
import SearchBox from "./SearchBox";
class ShowCustomers extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    customers: [],
    EditCustomerShow: false,
    searchQuery: "",
  };
  componentWillMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ customers: data });
      });
  };

  DeleteStudent = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/Shop/" + id, {
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
    const {
      shopId,
      name,
      shopCnic,
      shopPhone,
      name1,
      name2,
      pageSize,
      currentPage,
      customers: allCustomers,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.customers;
    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Customers = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>CNIC</th>
              <th>Phone</th>
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
