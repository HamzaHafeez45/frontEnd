import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowProducts from "../Components/ShowProducts";
import Nav from "../Components/Nav";
class Product extends Component {
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
                  to="/addProduct"
                >
                  Add Product
                </Link>
                <h3 className="text-muted text-center mb-3 mt-5">Products</h3>
                <ShowProducts />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Product;
