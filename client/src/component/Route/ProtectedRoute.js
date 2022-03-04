import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginSignUp from "../User/LoginSignUp";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated} = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
      <Routes>
        <Route
          {...rest}
          render={(props) => {
            // if (isAuthenticated === false) {
            //   // return <Navigate to="/login" />;
              
            // }
            if(isAuthenticated===true){
              return <Component {...props} />;}
              
              // return window.location.href='/login';
              return <LoginSignUp/>
            }}
        />
        </Routes>
        
       )} 
    </Fragment>
  );
};

export default ProtectedRoute;
