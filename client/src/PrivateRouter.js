import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRouter({ component: Component, ...rest }) {
    const {isAuthenticated} = useSelector((state)=>state.user)
    const go = isAuthenticated;
    console.log(go)
  return (
    <Route
      {...rest}
      component={(props) => {
        if (go) {
          return <Component {...props} />;
        } else {
          return <Navigate to={"/login"} />;
        }
      }}
    />
  );
}

export default PrivateRouter;