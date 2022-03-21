import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import { Backdrop } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <PersonIcon />, name: "Account", func: account },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },

    { icon: <ListAltIcon />, name: "Your Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Log Out", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function orders() {
    window.location.href = `/myOrders`;
  }
  function home() {
    window.location.href = `/`;
  }
  function account() {
    window.location.href = `/account`;
  }
  function cart() {
    window.location.href = `/cart`;
  }
  function dashboard() {
    window.location.href = `/admin/dashboard`;
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Log Out Successfully");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "99" }}
        open={open}
        direction="down"
        className="SpeedDial"
        icon={
          <img
            className="SpeedDialIcon"
            alt="profile"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
