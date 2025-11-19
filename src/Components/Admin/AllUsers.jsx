import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleUser, getAllUsers } from "../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleUserDelete = async (id) => {
    await dispatch(deleteSingleUser(id));
    await dispatch(getAllUsers());
    toast.success("User is deleted..", { position: "bottom-center" });
  };
  const { user } = useSelector((state) => state.authState);
  const { users = [] } = useSelector((state) => state.adminState);
  const columns = [
    {
      field: "no",
      headerName: "No",
      with: 50,
      headerAlign: "center",
      align: "center",
    },
    { field: "id", headerName: "User ID", width: 250, align: "center" },
    {
      field: "name",
      headerName: "User name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    { field: "role", headerName: "Role", width: 130 },
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
              navigate(`/admin/update-user/${params.row.id}`);
            }}
          >
            <FaEdit size={20} color="orange" />
          </Button>
          <Button
            disabled={user._id === params.row.id}
            onClick={() => handleUserDelete(params.row.id)}
          >
            <MdDelete
              size={20}
              color={user._id === params.row.id ? "hash" : "red"}
            />
          </Button>
        </div>
      ),
    },
  ];
  const rows = [];
  users.map((user, i) => {
    rows.push({
      no: i + 1,
      name: user.name,
      id: user._id,
      email: user.email,
      role: user.role,
    });
  });
  return (
    <div className="row ">
      <MetaData title={"Admin all users"} />
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

export default AllUsers;
