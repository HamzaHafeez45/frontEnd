import React from "react";
import { NavLink } from "react-router-dom";
import web from "../imgs/abc.jpg";
import Navbar from "../Components/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6  pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <img src={web} className="img-fluid animated" alt="home" />
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img d-flex justify-content-center flex-column">
                  <h1 className="mt-5">
                    Manage Your data with
                    <strong className="brand-name"> Managment Studio</strong>
                  </h1>
                  <h2 className="my-3">
                    We are provding the best solution <br />
                    for managing your data.
                  </h2>
                  <div className="mt-3">
                    <NavLink to="/login" className="btn-get-started">
                      Get Started
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
