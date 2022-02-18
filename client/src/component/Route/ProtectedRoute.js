import React from "react";
// import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const ProtectedRoute = ({element: Element, ...rest}) => {
const isAuthenticated=true;//just for testing
    return (

        <Route {...rest} render={props => (
            isAuthenticated===true ?
               ( <Element {...props} />)
            :( window.location.href="/login"))} />
    );
};
export default ProtectedRoute;