import React, {Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "../../actions/userActions";
import LoginSignUp from "../User/LoginSignUp";

import {useDispatch } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch= useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      {loading === false && (
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === true) {
                return <Component {...props} />;
              }
              window.location.href="/login"



            }}
          />
        </Routes>
      )}
    </Fragment>
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              return <Component {...props} />;
            }}
          />
        </Routes>
    </Fragment>
      )
};

// export default ProtectedRoute;
