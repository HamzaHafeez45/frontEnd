import React, { Component } from "react";
import fig from "../imgs/abc.jpg";
import Navbar from "../Components/Navbar";
import { login } from "../utils/authentication";
class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://sndwebapi.spikotech.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        Email: event.target.Email.value,
        Password: event.target.Password.value,
        grant_type: "password",
      }),
    })
      .then((Response) => Response.json())
      .then(login(Response.access_token), this.props.history.push("/dashboard"))
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    return (
      <>
        <Navbar />
        <section id="form" className="d-flex align-items-center">
          <div className="container-fluid nav_bg">
            <div className="row">
              <div className="col-10 mx-auto">
                <div className="row">
                  <div className="col-md-6  pt-lg-0 order-2 order-lg-1">
                    <img src={fig} className="img-fluid animated" alt="home" />
                  </div>
                  <div className="col-md-6  pt-lg-0 order-2 order-lg-1">
                    <div className="row">
                      <div className="col-10 mx-auto">
                        <h1 className="my-5 ">Log In Here</h1>
                        <form
                          className="Signup-form mt-5"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="form-group mt-5">
                            <label className="font-weight-bold">Email</label>
                            <input
                              type="text"
                              name="Email"
                              className="form-control border border-dark"
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="form-group mt-2">
                            <label className="form-label font-weight-bold">
                              Password
                            </label>
                            <div>
                              <input
                                name="Password"
                                className="form-control border border-dark"
                                type="password"
                                placeholder="Enter your password"
                                required
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            name="login"
                            className="btn btn-lg  btn-lg mt-4 btn-register"
                          >
                            Log In
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
