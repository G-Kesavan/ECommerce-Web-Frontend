import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders } from "../../actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const AllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  const handleOrderDelete = async (id) => {
    await dispatch(deleteOrder(id));
    await dispatch(getAllOrders());
    toast.success("Order is deleted..", { position: "bottom-center" });
  };
  const { orders = [] } = useSelector((state) => state.adminState);
  const columns = [
    {
      field: "no",
      headerName: "No",
      with: 50,
      headerAlign: "center",
      align: "center",
    },
    { field: "id", headerName: "Order ID", width: 250, align: "center" },
    { field: "date", headerName: "Order Date", width: 130 },
    {
      field: "products",
      headerName: "Products",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => {
              navigate(`/admin/update-orders/${params.row.id}`);
            }}
          >
            <FaEdit size={20} color="orange" />
          </Button>
          <Button onClick={() => handleOrderDelete(params.row.id)}>
            <MdDelete size={20} color="red" />
          </Button>
        </div>
      ),
    },
  ];
  const rows = [];
  orders.map((order, i) => {
    rows.push({
      no: i + 1,
      name: order.name,
      id: order._id,
      products: order.orderItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0),
      price: order.totalPrice.toFixed(2),
      date: new Date(order.createAt).toLocaleDateString(),
    });
  });
  return (
    <div className="row ">
      <MetaData title={"Admin all orders"} />
      <SideBar />
      <DataGrid
        className="w-fit m-5 "
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
    </div>
  );
};

export default AllOrders;
