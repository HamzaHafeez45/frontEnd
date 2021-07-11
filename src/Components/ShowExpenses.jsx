import React, { Component } from "react";
import Pagination from "./Pagination";
import { paginate } from "../utils/Pagination";
import SearchBox from "./SearchBox";
class ShowExpenses extends Component {
  state = {
    pageSize: 7,
    currentPage: 1,
    expenses: [],
    EditBrandShow: false,
    searchQuery: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Expense")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ expenses: data });
      });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  render() {
    const { length: count } = this.state.expenses;
    const {
      pageSize,
      currentPage,
      expenses: allExpenses,
      searchQuery,
    } = this.state;
    let filtered = allExpenses;
    if (searchQuery)
      filtered = allExpenses.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const Expenses = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
        <table class="table table-striped bg-light text-center mt-4">
          <thead>
            <tr class="text-muted">
              <th>ID</th>
              <th>Description</th>
              <th>Ammount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Expenses.map((expense) => (
              <tr key={expense.expenseId}>
                <td>{expense.expenseId}</td>
                <td>{expense.description}</td>
                <td>{expense.ammount}</td>
                <td>{expense.expenseDate}</td>
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
      </>
    );
  }
}

export default ShowExpenses;
