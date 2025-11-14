import { Box, TableBody } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrder } from "../../actions/orderAction";

const MyOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrder());
  }, [dispatch]);
  const { orders } = useSelector((state) => state.ordersState);
  const columns = [
    {
      field: "no",
      headerName: "No",
      with: 50,
      headerAlign: "center",
      align: "center",
    },
    { field: "date", headerName: "Order Date", width: 140 },
    { field: "id", headerName: "Order ID", width: 250 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <p
          className={` ${
            params.row.status === "processing"
              ? "text-green-900"
              : "text-red-800"
          }`}
        >
          {params.row.status.toUpperCase()}
        </p>
      ),
    },
    {
      field: "viewDetails",
      headerName: "Details",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Link to={`/order-details/${params.row.id}`}>View</Link>
      ),
    },
  ];
  const rows = [];
  orders.map((order, i) => {

    rows.push({
      no: i + 1,
      id: order._id,
      quantity: order.orderItems.reduce((acc, item) => acc + item.quantity, 0),
      amount: order.totalPrice.toFixed(2),
      status: order.orderStatus,
      date: new Date(order.createAt).toLocaleDateString()
    });
  });
  return (
    <Box className="flex m-5">
      <DataGrid
        sx={{ width: "fit-content" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default MyOrder;
