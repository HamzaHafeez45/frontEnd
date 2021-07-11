import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import Distributions from "./Distributions";
import AddDistributions from "./AddDistribution";
import Categories from "./Categories";
import AddCategories from "./AddCategories";
import AddCity from "./AddCity";
import Cities from "./Cities";
import AddRoute from "./AddRoute";
import Routes from "./Routes";
import AddArea from "./AddArea";
import Areas from "./Areas";
import Customers from "./Customers";
import AddCustomer from "./AddCustomer";
import Agents from "./Agents";
import AddAgent from "./AddAgent";
import Warehouse from "./Warhouse";
import AddWarehouse from "./AddWarehouse";
import AddProduct from "./AddProduct";
import Product from "./Product";
import AddReqProduct from "./AddReqProduct";
import ReqProducts from "./ReqProducts";
import AddBrand from "./AddBrand";
import Brand from "./Brand";
import Stock from "./Stock";
import AddStock from "./AddStock";
import Order from "./Order";
import AddOrder from "./AddOrder";
import Expenses from "./Expenses";
import AddExpenses from "./AddExpenses";
import OrderDetailPage from "./OrderDetailPage";
import AgentShops from "./AgentShops";
import AssignShop from "./AssignShop";
import AssignedShops from "./AssignedShops";
import AddSalesTarget from "./AddSalesTarget";
import SalesTarget from "./SalesTarget";
import CustomerLocation from "./customerLocations";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
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
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/addExpense" component={AddExpenses} />
        <Route exact path="/details/:id" component={OrderDetailPage} />
        <Route exact path="/agentShop" component={AgentShops} />
        <Route exact path="/assignedShop" component={AssignedShops} />
        <Route exact path="/assignShop" component={AssignShop} />
        <Route exact path="/addTarget" component={AddSalesTarget} />
        <Route exact path="/salesTarget" component={SalesTarget} />
        <Route exact path="/shopLocations" component={CustomerLocation} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
