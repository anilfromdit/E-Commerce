import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CallIcon from '@mui/icons-material/Call';
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { loading, error, user } = useSelector((state) => state.userDetails);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("");
  
    const {id} = useParams();
  
    useEffect(() => {
      if (user && user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setContactNumber(user.contactNumber);
        setRole(user.role);
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("User Updated Successfully");
        window.location.href='/admin/users'
        dispatch({ type: UPDATE_USER_RESET });
      }
    }, [dispatch, alert, error, isUpdated, updateError, user, id]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("contactNumber", contactNumber);
      myForm.set("role", role);
  
      dispatch(updateUser(id, myForm));
    };

  return (
    <Fragment>
    <MetaData title="Update User" />
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="createProductForm "
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div >
                  <CallIcon />
                  <input
                    type="number"
                    required
                    placeholder="Contact Number "
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e)=>setContactNumber(e.target.value)}
                  />
                </div>
            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </div>
  </Fragment>
  )
}

export default UpdateUser