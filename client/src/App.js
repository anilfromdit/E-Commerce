import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import { useEffect, useState } from "react";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import MyNavbar from "./component/layout/Header/MyNavbar";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Page404 from "./component/Misc/Page404";
import Loader from "./component/layout/Loader/Loader";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList";
import UserList from "./component/Admin/UserList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateOrder from "./component/Admin/UpdateOrder";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import store from "./store";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <MyNavbar />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/testLoader" element={<Loader />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products/offer/:offer" element={<Products />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route path="/login/:redirect" element={<LoginSignUp />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/myOrders" element={<MyOrders />} />
        <Route exact path="/myOrder/:id" element={<OrderDetails />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path='/admin/dashboard' element={<Dashboard/>}/>
        <Route exact path='/admin/products' element={<ProductList/>}/>
        <Route exact path='/admin/product/:id' element={<UpdateProduct/>}/>
        <Route exact path='/admin/newProduct' element={<NewProduct/>}/>
        <Route exact path='/admin/orders' element={<OrderList/>}/>
        <Route exact path='/admin/order/:id' element={<UpdateOrder/>}/>
        <Route exact path='/admin/users' element={<UserList/>}/>
        <Route
          exact
          path="/password/updatePassword"
          element={<UpdatePassword />}
        />
        <Route exact path="/password/reset" element={<ForgotPassword />} />
        <Route exact path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
