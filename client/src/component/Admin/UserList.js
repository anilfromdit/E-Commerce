import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllUsers,
  deleteUser
} from "../../actions/userActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { error, users } = useSelector((state) => state.allUsers);
  
    const {
      error: deleteError,
      isDeleted,
      message,
    } = useSelector((state) => state.profile);
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
  
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success(message);
        window.location.href="/admin/users"; 
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError,isDeleted, message]);
  
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
          
        },
        {
          field: "role",
          headerName: "Role",
          minWidth: 150,
          flex: 0.4,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor allCaps"
              : "blackColor allCaps";
          },
        },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 270,
          flex: 1,
        },
    
        {
          field: "contact",
          headerName: "Contact",
          minWidth: 270,
          flex: 0.3,
        },
    
        {
          field: "actions",
          flex: 0.1,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
                }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            name:item.name,
            email:item.email,
            contact:item.contactNumber,
            role:item.role,
          });
        });
 
  return (
    <Fragment>
    <MetaData title={`All USERS`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  )
}

export default UserList