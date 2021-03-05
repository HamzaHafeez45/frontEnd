import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
class AssignShop extends Component {
  state = {
    agents: [],
    shops: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/api/AssignShop", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignShopId: null,
        agentId: event.target.agentId.value,
        shopId: event.target.shopId.value,
      }),
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
  };

  componentDidMount = () => {
    this.getAgents();
    this.getShops();
  };
  getAgents = () => {
    fetch("http://sndwebapi.spikotech.com/api/Agent")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  };
  getShops = () => {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ shops: data });
      });
  };

  render() {
    const { agents, shops } = this.state;
    return (
      <>
        <Nav />
        <ToastContainer />
        <div className="container-fluid mt-5">
          <div className="row mb-5">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row">
                <div className="col-xl-1 col-12 mb-xl-0"></div>
                <div className="col-xl-4 col-12 mb-4 mb-xl-0">
                  <Link
                    exact
                    className="btn btn-success btn-md"
                    to="/assignedShop"
                  >
                    Show Shops
                  </Link>
                  <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">agent</label>
                      <select
                        class="form-control border border-dark"
                        name="agentId"
                      >
                        <option>--Select Agent--</option>
                        {agents.map((agent) => (
                          <option key={agent.agentId} value={agent.agentId}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mt-2">
                      <label className="font-weight-bold">Shop</label>
                      <select
                        class="form-control border border-dark"
                        name="shopId"
                      >
                        <option>--Select Shop--</option>
                        {shops.map((shop) => (
                          <option key={shop.shopId} value={shop.shopId}>
                            {shop.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-primary  btn-lg mt-4 btn-register"
                    >
                      Assign
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AssignShop;
