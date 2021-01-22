import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import SignUp from "../Components/Signup";
import Main from "../Components/Main";
import Card from "../Components/Card";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Dashboard from "../Components/Dashboard";
import Distributions from "../Components/Distributions";
import AddDistributions from "../Components/AddDistribution";
import Categories from "../Components/Categories";
import AddCategories from "../Components/AddCategories";
import AddCity from "../Components/AddCity";
import Cities from "../Components/Cities";
import AddRoute from "../Components/AddRoute";
import Routes from "../Components/Routes";
import AddArea from "../Components/AddArea";
import Areas from "../Components/Areas";
import Customers from "../Components/Customers";
import AddCustomer from "../Components/AddCustomer";
import Agents from "../Components/Agents";
import AddAgent from "../Components/AddAgent";
import Warehouse from "../Components/Warhouse";
import AddWarehouse from "../Components/AddWarehouse";
import AddProduct from "../Components/AddProduct";
import Product from "../Components/Product";
import AddReqProduct from "../Components/AddReqProduct";
import ReqProducts from "../Components/ReqProducts";
import AddBrand from "../Components/AddBrand";
import Brand from "../Components/Brand";
import Stock from "../Components/Stock";
import AddStock from "../Components/AddStock";
import Order from "../Components/Order";
import AddOrder from "../Components/AddOrder";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/card" component={Card} />
        <Route exact path="/distributions" component={Distributions} />
        <Route exact path="/addDistributions" component={AddDistributions} />
        <Route exact path="/addCategories" component={AddCategories} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/addCity" component={AddCity} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/addRoute" component={AddRoute} />
        <Route exact path="/routes" component={Routes} />
        <Route exact path="/addArea" component={AddArea} />
        <Route exact path="/areas" component={Areas} />
        <Route exact path="/addCustomer" component={AddCustomer} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/addAgent" component={AddAgent} />
        <Route exact path="/agents" component={Agents} />
        <Route exact path="/warehouse" component={Warehouse} />
        <Route exact path="/addWarehouse" component={AddWarehouse} />
        <Route exact path="/addProduct" component={AddProduct} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/addReqProduct" component={AddReqProduct} />
        <Route exact path="/requestProduct" component={ReqProducts} />
        <Route exact path="/addBrand" component={AddBrand} />
        <Route exact path="/brand" component={Brand} />
        <Route exact path="/addStock" component={AddStock} />
        <Route exact path="/stock" component={Stock} />
        <Route exact path="/addOrder" component={AddOrder} />
        <Route exact path="/order" component={Order} />
        <Redirect to="/" />
        <Home />
      </Switch>
    </>
  );
};

export default App;
