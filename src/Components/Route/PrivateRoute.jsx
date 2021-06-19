import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils/authentication";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.node,
  restricted: PropTypes.bool,
};
export default PrivateRoute;
