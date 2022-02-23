import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import LoginSignUp from "./LoginSignUp";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
    return (
      <Fragment>
        {loading ? <Loader /> :
          <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
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
                    </>:
                    <h4>!!NO DEFAULT ADDRESS SAVED</h4>
                  }
                </div>
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>

                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
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