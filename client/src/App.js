import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { Fragment } from "react";
import { useEffect } from "react";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import MyNavbar from "./component/layout/Header/MyNavbar";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
// import Page404 from "./component/Misc/Page404";
import Loader from "./component/layout/Loader/Loader";
import { ProtectedRoute, PublicRoute } from "./component/Route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <MyNavbar />
      {isAuthenticated && <UserOptions user={user} />}
      <PublicRoute exact path="/" element={<Home />} />
      <PublicRoute exact path="/testLoader" element={<Loader />} />
      <PublicRoute exact path="/product/:id" element={<ProductDetails />} />
      <PublicRoute exact path="/products" element={<Products />} />
      <PublicRoute path="/products/:keyword" element={<Products />} />
      <PublicRoute path="/products/offer/:offer" element={<Products />} />
      <PublicRoute
        exact
        path="/password/reset/:token"
        element={<ResetPassword />}
      />
      <PublicRoute exact path="/login" element={<LoginSignUp />} />
      <ProtectedRoute exact path="/account" element={<Profile />} />
      <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} />
      <ProtectedRoute
        exact
        path="/password/updatePassword"
        element={<UpdatePassword />}
      />
      <ProtectedRoute
        exact
        path="/password/reset"
        element={<ForgotPassword />}
      />

      <Footer />
    </Router>
  );
}

export default App;
