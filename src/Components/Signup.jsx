import React, { Component } from "react";
import desk from "../imgs/abc.jpg";
import Navbar from "../Components/Navbar";
class SignUp extends Component {
  state = {
    messege: "",
  };
  handleReset = () => {
    this.myFormRef.reset();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:44331/api/Account/Register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        Email: event.target.user_Email.value,
        Password: event.target.user_Password.value,
        ConfirmPassword: event.target.CPassword.value,
      }),
    })
      .then((Response) => Response.json())
      .then(alert("Registration successful"), this.handleReset())
      .catch((err) => {
        alert(err);
        this.handleReset();
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
                    <img src={desk} className="img-fluid animated" alt="home" />
                  </div>
                  <div className="col-md-6  pt-lg-0 order-2 order-lg-1">
                    <div className="row">
                      <div className="col-10 mx-auto">
                        <h1 className="my-5">Sign Up Here</h1>
                        <form
                          className="Signup-form mt-5"
                          onSubmit={this.handleSubmit}
                          ref={(el) => (this.myFormRef = el)}
                        >
                          {/* <div className="form-group mt-5">
                            <label className="font-weight-bold">Name</label>
                            <input
                              type="text"
                              name="user_Name"
                              className="form-control border border-dark"
                              placeholder="Enter your name"
                              required
                            />
                          </div> */}

                          <div className="form-group ">
                            <label className="font-weight-bold">Email</label>
                            <input
                              type="text"
                              name="user_Email"
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
                                name="user_Password"
                                className="form-control border border-dark"
                                type="password"
                                placeholder="Enter your password"
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group mt-2">
                            <label className="form-label font-weight-bold">
                              Password
                            </label>
                            <div>
                              <input
                                name="CPassword"
                                className="form-control border border-dark"
                                type="password"
                                placeholder="Confirm your password"
                                required
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            name="Signup"
                            className="btn btn-lg  btn-lg mt-4 btn-register"
                          >
                            Sign Up
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

export default SignUp;
