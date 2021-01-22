import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowCategories from "../Components/ShowCategories";
import Nav from "../Components/Nav";
class Categories extends Component {
  render() {
    return (
      <>
        <Nav />
        <section>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <Link
                  className="btn btn-md btn-success float-right"
                  to="/addCategories"
                >
                  Add Category
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">Categories</h3>
                <ShowCategories />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Categories;
