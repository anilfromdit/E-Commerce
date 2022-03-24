import React, { Fragment, useState, useEffect } from "react";
import "./MyNavbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const MyNavbar = () => {
  const [keyword, setKeyword] = useState("");
  const[text,setText] = useState("Login")
  const[mlink,setMLink] = useState("/login")

  let {isAuthenticated}=useSelector((state)=>state.user)
 
  useEffect(() => {
      if(isAuthenticated){
          setText("Profile");
          setMLink("/account");
        }
        
    }, [isAuthenticated])
    
    

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href = `/products/${keyword}`;
    } else {
      window.location.href = `/products/`;
    }
  };

  return (
    <Fragment>
      <nav>
        <div className="logo">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h2>
              <span>E-</span>Mart
            </h2>
          </NavLink>
        </div>

        <div className={"menu-link"}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            
            {isAuthenticated ? (
              <li>
                <NavLink to={mlink}>Profile</NavLink>
              </li>
            ) :
             (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )
            
            }
             <li>
                <NavLink to={mlink}>{text}</NavLink>
              </li>

            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <form className="search" id="searchForm" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="search here"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="submitButton">
            {<SearchIcon />}
          </button>
        </form>
        <div className="rightMenu">
          <div>
        <NavLink to="/cart">
          <ShoppingCartIcon />
        </NavLink>
        </div>
            {
              isAuthenticated?
              <div className="profile">
                <NavLink to='/account'>
              <AccountCircleRoundedIcon/>
              </NavLink>
              <p style={{width:"100%",textAlign:"center"}}>
                Profile
              </p>
              </div>
              :
              <div className="login">
              <NavLink to='/login'>
              <LoginIcon/>
              </NavLink>
              <p style={{width:"100%",textAlign:"center"}}>
                Login
              </p>
              </div>
            }

        </div>
      </nav>
    </Fragment>
  );
};

export default MyNavbar;
