import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import EditCategory from "./EditCategory";
import { toast, ToastContainer } from "react-toastify";
import SearchBox from "./SearchBox";
class ShowCategories extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    categories: [],
    EditCategoryShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/categories")
      .then((Response) => Response.json())
      .then((categories) => {
        this.setState({ categories });
      });
  };

  DeleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("http://sndwebapi.spikotech.com/api/categories/" + id, {
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
      categoryId,
      name,
      pageSize,
      currentPage,
      categories: allCategories,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.categories;

    let filtered = allCategories;
    if (searchQuery)
      filtered = allCategories.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const Categories = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <ToastContainer />
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table className="table table-striped bg-light text-center mt-4">
          <thead>
            <tr className="text-muted">
              <th>Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.name}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#editCategoryexampleModalCenter"
                    onClick={() =>
                      this.setState({
                        EditCategoryShow: true,
                        categoryId: category.categoryId,
                        name: category.name,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.DeleteCategory(category.categoryId)}
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

        <EditCategory
          show={this.state.EditCategoryShow}
          onHide={this.EditCategoryClose}
          categoryId={categoryId}
          name={name}
        />
      </>
    );
  }
}

export default ShowCategories;
