import React, { Component } from "react";
import Pagination from "../Components/Pagination";
import { paginate } from "../utils/Pagination";
import EditCategory from "../Components/EditCategory";

class ShowCategories extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    categories: [],
    EditCategoryShow: false,
  };

  componentDidMount = () => {
    fetch("https://localhost:44331/api/Categories")
      .then((Response) => Response.json())
      .then((categories) => {
        this.setState({ categories });
      });
  };

  DeleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44331/api/Categories/" + id, {
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
    const { categoryId, name } = this.state;

    const { length: count } = this.state.categories;

    const { pageSize, currentPage, categories: allCategories } = this.state;

    const Categories = paginate(allCategories, currentPage, pageSize);
    return (
      <>
        <table className="table table-striped bg-light text-center">
          <thead>
            <tr className="text-muted">
              <th>categoryId</th>
              <th>Category Name</th>
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
