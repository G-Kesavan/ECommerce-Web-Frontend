import { Rating } from "@mui/material";
import React from "react";

const ListReview = ({ review }) => {
  return (
    <div className="review-card my-3">
      <Rating readOnly value={Number(review.rating)} />
      <p className="review_user">by {review.user.name}</p>
      <p className="review_comment">{review.comment}</p>
      <hr />
    </div>
  );
};

export default ListReview;
