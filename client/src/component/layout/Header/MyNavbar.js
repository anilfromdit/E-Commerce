import React, { Fragment, useState, useEffect } from "react";
import "./MyNavbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MyNavbar = () => {
  const [keyword, setKeyword] = useState("");
  const[text,setText] = useState("Login")
  const[mlink,setMLink] = useState("/login")

  let {isAuthenticated}=useSelector((state)=>state.user)
 
  useEffect(() => {
      if(isAuthenticated){
          setText("Profile");
          setMLink("/profile");
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
{/*             
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
            
            } */}
             <li>
                <NavLink to={mlink}>{text}</NavLink>
              </li>

            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
          </ul>
        </div>

        <form className="search" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="search your product..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="submitButton">
            {<SearchIcon />}
          </button>
        </form>
        <NavLink to="/cart" className="cart">
          <ShoppingCartIcon />
        </NavLink>
      </nav>
    </Fragment>
  );
};

export default MyNavbar;
