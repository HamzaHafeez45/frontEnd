import Card from "../Components/Card";
import React, { Component } from "react";
import Nav from "../Components/Nav";
import Cards from "../Components/Cards";
class Dashboard extends Component {
    render() { 
        return ( 
            <>
            <Nav/>
           <Card/>
            <Cards/>
            </>
         );
    }
}
 
export default Dashboard;