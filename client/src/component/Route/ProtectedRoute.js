import React, {Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginSignUp from "../User/LoginSignUp";
import {useDispatch } from "react-redux";
import {Navigate, Outlet} from "react-router-dom"

export const ProtectedRoute = ({roleRequired}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (roleRequired) {
		return isAuthenticated ? (
			roleRequired === user.role ? (
				<Outlet />
			) : (
				<Navigate to="/login" />
			)
		) : (
			<Navigate to="/login" />
		)
	} else {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
	}
};

// export const PublicRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Fragment>
//         <Routes>
//           <Route
//             {...rest}
//             render={(props) => {
//               return <Component {...props} />;
//             }}
//           />
//         </Routes>
//     </Fragment>
//       )
// };

// export default ProtectedRoute;
