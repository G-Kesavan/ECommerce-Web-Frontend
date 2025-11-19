import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteProduct, getAllProducts } from "../../actions/adminAction";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.adminState);
  const handleProductDelete = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
    toast.success("Product is deleted..", { position: "bottom-center" });
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const columns = [
    {
      field: "no",
      headerName: "No",
      with: 50,
      headerAlign: "center",
      align: "center",
    },
    { field: "id", headerName: "Product ID", width: 250 },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "stock",
      headerName: "Stock",
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
              navigate(`/admin/update-product/${params.row.id}`);
            }}
          >
            <FaEdit size={20} color="orange" />
          </Button>
          <Button onClick={() => handleProductDelete(params.row.id)}>
            <MdDelete size={20} color="red" />
          </Button>
        </div>
      ),
    },
  ];
  const rows = [];
  products.map((product, i) => {
    rows.push({
      no: i + 1,
      name: product.name,
      id: product._id,
      stock: product.stock,
      price: product.price.toFixed(2),
      date: new Date(product.createAt).toLocaleDateString(),
    });
  });
  return (
    <div className="row ">
      <MetaData title={"Admin all Product"} />
      <SideBar />
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default AllProducts;
