import React, { useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviews, getReviews } from "../../actions/adminAction";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Rating } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const Reviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const handleReviewsSearch = async () => {
    await dispatch(getReviews(productId));
  };

  const handleReviewDelete = async (reviewId) => {
    await dispatch(deleteReviews(productId, reviewId));
    await dispatch(getReviews(productId));
    toast.success("Review is deleted..", { position: "bottom-center" });
  };

  const { reviews, loading } = useSelector((state) => state.adminState);

  const columns = [
    { field: "no", headerName: "No", width: 50, align: "center" },
    { field: "id", headerName: "Review ID", width: 200 },
    {
      field: "userName",
      headerName: "User name",
      width: 130,
    },
    {
      field: "userEmail",
      headerName: "User email",
      width: 180,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 130,
      align: "center",
      renderCell: (params) => <Rating value={params.row.rating} size="small" />,
    },
    { field: "comment", headerName: "Comment", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button onClick={() => handleReviewDelete(params.row.id)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
  ];
  const rows = [];
  reviews?.map((review, i) => {
    rows.push({
      no: i + 1,
      id: review._id,
      userName: review.user.name,
      userEmail: review.user.email,
      comment: review.comment,
      rating: Number(review.rating),
    });
  });
  return (
    <div className="row">
      <MetaData title={"Admin Reviews"} />
      <SideBar />
      <div className="container container-fluid col-12 col-md-9 ml-auto mr-auto">
        <div className="row justify-content-center mt-5 m-2">
          <div className="col-5">
            <div className="form-group">
              <label htmlFor="productId_field">Enter Product ID</label>
              <input
                type="text"
                id="email_field"
                value={productId}
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
                className="form-control"
              />
            </div>

            <button
              id="search_button"
              onClick={handleReviewsSearch}
              disabled={loading}
              className="btn btn-primary btn-block py-2"
            >
              SEARCH
            </button>
          </div>
        </div>
        <DataGrid
          className="w-fit m-5 h-auto "
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
    </div>
  );
};

export default Reviews;
