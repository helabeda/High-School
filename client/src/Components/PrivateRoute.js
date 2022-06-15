import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
