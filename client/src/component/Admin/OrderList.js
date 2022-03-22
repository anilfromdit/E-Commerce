import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllOrders,
  deleteOrder
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SideBar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Loader from "../layout/Loader/Loader";

const OrderList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { error, orders } = useSelector((state) => state.allOrders);
  
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.order
    );
  
    const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
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
        alert.success("Order Deleted Successfully");
        window.location.href="/admin/orders";
        dispatch({ type: DELETE_ORDER_RESET });
      }
  
      dispatch(getAllOrders());
    }, [dispatch, alert, error,deleteError,isDeleted]);
  
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor allCaps"
              : "redColor allCaps";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
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
    
      orders &&
        orders.forEach((item) => {
          rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount:`₹${item.totalPrice}` ,
            status: item.orderStatus,
          });
        });
  return (
    <Fragment>
    <MetaData title={`All Orders`} />

    <div className="dashboard">
      <SideBar />

      { orders ?
        <>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL ORDERS</h1>


        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
      </>
      : <Loader/>
      }
    </div>
  </Fragment>
  )
}

export default OrderList