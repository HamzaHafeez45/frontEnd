import React, { Component } from "react";

import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

class Card extends Component {
  state = {
    sales: [],
    expenses: [],
    salesAmmount: 0,
    expensesAmmount: 0,
    customers: [],
    agents: [],
    profit: 0,
    orders: [],
  };
  componentDidMount() {
    this.Sales();
    this.Expenses();
    this.Customers();
    this.Agents();
    this.Orders();
  }
  Expenses() {
    fetch("http://sndwebapi.spikotech.com/api/Expense")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ expenses: data });
      });
  }
  Sales() {
    fetch("http://sndwebapi.spikotech.com/api/Order")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ sales: data });
      });
  }
  Customers() {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ customers: data });
      });
  }
  Agents() {
    fetch("http://sndwebapi.spikotech.com/api/Agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  }
  Orders() {
    fetch("http://sndwebapi.spikotech.com/api/Order")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ orders: data });
      });
  }
  calculateSales = () => {
    const { sales } = this.state;
    const Sales = sales.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalAmount,
      0
    );

    return Sales;
  };
  calculateExpenses = () => {
    const { expenses } = this.state;
    const Expenses = expenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.ammount,
      0
    );

    return Expenses;
  };
  calculateProfit = () => {
    const { sales } = this.state;
    const Profit = sales.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalProfit,
      0
    );

    return Profit;
  };
  render() {
    let { salesAmmount, expensesAmmount, profit, orders, agents } = this.state;
    salesAmmount = this.calculateSales();
    expensesAmmount = this.calculateExpenses();
    profit = this.calculateProfit();
    const { length: noOFCustomers } = this.state.customers;
    const { length: noOFAgents } = this.state.agents;
    const loss = this.state.profit - this.state.expensesAmmount;
    return (
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <h3 className="text-muted text-center mt-5">Dashboard</h3>
              <div className="row pt-md-5 mt-md-3 mb-5">
                <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fa fa-money fa-5x" aria-hidden="true"></i>
                        <div className="text-right text-secondary">
                          <h5>Sales</h5>
                          <h3>Rs. {salesAmmount}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fa fa-money-bill-alt fa-3x text-success"></i>
                        <div className="text-right text-secondary">
                          <h5>Expenses</h5>
                          <h3>Rs. {expensesAmmount}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                        <div className="text-right text-secondary">
                          <h5>Customers</h5>
                          <h3>{noOFCustomers}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i
                          className="fa fa-user-secret fa-5x"
                          aria-hidden="true"
                        ></i>
                        <div className="text-right text-secondary">
                          <h5>Agents</h5>
                          <h3>{noOFAgents}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-chart-line fa-3x text-danger"></i>
                        <div className="text-right text-secondary">
                          <h5>Profit</h5>
                          <h3>Rs. {profit}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-xl-4 col-sm-6 p-4 ">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-chart-line fa-3x text-danger"></i>
                        <div className="text-right text-secondary">
                          <h5>Loss</h5>
                          <h3>Rs. {loss > 0 ? 0 : loss}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-xl-6 col-sm-6 p-4 ">
                  <BarChart width={470} height={250} data={orders}>
                    <CartesianGrid />
                    <XAxis dataKey="Shop" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#3498db" />
                  </BarChart>
                </div>
                <div className="col-xl-6 col-sm-6 p-4 ">
                  <BarChart width={470} height={250} data={agents}>
                    <CartesianGrid />
                    <XAxis dataKey="agentType" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="agentSalary" fill="#3498db" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Card;
