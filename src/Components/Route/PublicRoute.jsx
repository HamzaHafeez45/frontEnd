import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils/authentication";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
PublicRoute.propTypes = {
  component: PropTypes.node,
  restricted: PropTypes.bool,
};
export default PublicRoute;
