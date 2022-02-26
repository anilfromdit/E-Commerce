import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import LoginSignUp from "./LoginSignUp";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
    return (
      <Fragment>
        {loading ? <Loader /> :
          <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="mainWrapper">
              <div className="profileContainer">
                <div>
                  <img className="profilePic" src={user.avatar.url} alt={user.name} />
                  <p className="userName">{user.name}</p
                  >
                  <div className="userContactInfo">
                    <h3 className="userHeadings">Contact Info</h3>
                    {user.contactNumber &&
                      <>
                        <h6>Contact Number</h6>
                        <h4>{user.contactNumber}</h4>
                      </>
                    }
                    {user.email &&
                      <>
                        <h6>Email</h6>
                        <h4>{user.email}</h4>
                      </>
                    }
                  </div> 
                  <div className="userShippingInfo">
                    <h3 className="userHeadings">Saved Address</h3>
                    <h6>Address</h6>
                    {user.defaultAddress ?
                      <>
                        <h4>{user.defaultAddress}</h4>
                      </> :
                      <h4>!!NO DEFAULT ADDRESS SAVED😟 </h4>
                    }
                  </div>
                  <Link to="/me/update">Edit Profile</Link>
                </div>
              </div>
              <div>
                <div className="right">
                  <div className="Wrapper">
                    <Link to="/orders">
                      <div className="orderIcon">
                        <ShoppingCartIcon />
                      </div>
                      <div className="stuff">
                        <h3>Your Orders</h3>
                        <h6> Track/return Your Orders </h6>

                      </div>
                    </Link>
                  </div>

                  <div className="Wrapper">
                    <Link to="/password/updatePassword">
                      <div className="orderIcon">
                        <LockIcon />
                      </div>
                      <div className="stuff">
                        <h3>Login and Security</h3>
                        <h6> Changed/Reset Password</h6>

                      </div>
                    </Link>
                  </div>

                </div>
                <div className="recentOrders">
                  <h3>Your Recent Orders</h3>
                  {user.recentOrder ? {} :
                    <div className="noOrder">
                      <h6 id="someIdBecauseGuptaKringGussa">no recent order found </h6>
                      <br />

                      <div className="sWrapper" id='myWr'>
                        <Link to="/Products">
                          
                  <div id='irritatedMeNamingDivs' >
                          <div className="boxIcon">
                            <img src="/box.jpg" width={"100px"} height={"80px"} />
                          </div>
                          <div className="stuff">
                            <h3 >Buy Something</h3>
                            <h6 id="someh6" > Your recent order history will appear here</h6>
                          </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

          </Fragment>
        }
      </Fragment>

    );
  }
  else {
    return (
      <LoginSignUp />
    )
  }

};

export default Profile;