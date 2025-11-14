import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviwe, getProduct } from "../../actions/productsAction";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../../utils/MetaData";
import { useState } from "react";
import { addCartItems } from "../../actions/cartAction";
import { Box, Modal, Rating, Typography } from "@mui/material";
import ListReview from "./ListReview";

const ProductDetials = () => {
  const [isOpen, setisOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const {isAuthenticated} = useSelector((state)=>state.authState)
  const { product, loading } = useSelector((state) => state.productState);
  const [quantity, setQuantity] = useState(1);

  const createReviewHandler = async () => {
    await dispatch(createReviwe(product._id, rating, comment));
    setisOpen(false);
    dispatch(getProduct(id));
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const addCartItem = () => {
    dispatch(addCartItems(product._id, quantity));
  };

  const increaseQuantity = () => {
    if (product.stock === 0) {
      return;
    }
    if (product.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (product.stock === 0) {
      return;
    }
    if (quantity != 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {product ? (
            <>
              <MetaData title={product.name} />
              <div className="container container-fluid">
                <div className="row f-flex justify-content-around">
                  <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel prevLabel="" nextLabel="">
                      {product.images &&
                        product.images.map((image) => (
                          <Carousel.Item key={image._id}>
                            <img
                              src={image.image}
                              alt={product.name}
                              height="500"
                              width="500"
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                  </div>

                  <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr />

                    <div className="rating-outer">
                      <div
                        className="rating-inner"
                        style={{ width: `${product.ratings * 10 * 2}%` }}
                      ></div>
                    </div>
                    <span id="no_of_reviews">
                      ({product.numOfReviews} Reviews)
                    </span>

                    <hr />

                    <p id="product_price">₹{product.price}</p>
                    <div className="stockCounter d-inline">
                      <span
                        className="btn btn-danger minus"
                        onClick={decreaseQuantity}
                      >
                        -
                      </span>

                      <input
                        id={product._id}
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                      />

                      <span
                        className="btn btn-primary plus"
                        onClick={increaseQuantity}
                      >
                        +
                      </span>
                    </div>
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-primary d-inline ml-4"
                      disabled={product.stock === 0 ? true : false}
                      onClick={addCartItem}
                    >
                      Add to Cart
                    </button>

                    <hr />

                    <p>
                      Status:{" "}
                      <span
                        className={
                          product.stock > 0 ? `greenColor` : `redColor`
                        }
                        id="stock_status"
                      >
                        {product.stock > 0 ? `In Stock` : `Out of Stock`}
                      </span>
                    </p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p id="product_seller mb-3">
                      Sold by: <strong>{product.seller}</strong>
                    </p>

                    {isAuthenticated?<button
                      id="review_btn"
                      type="button"
                      className="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#ratingModal"
                      onClick={() => setisOpen(true)}
                    >
                      Submit Your Review
                    </button>:<div className="w-full p-2 bg-amber-300 m-[10px_10px_10px_0px] rounded-2xl place-content-center flex">Login to submit Review</div>}
                    <Modal
                      open={isOpen}
                      className="w-full flex items-center justify-center"
                    >
                      <Box className="bg-white w-fit flex flex-col p-4 relative rounded-sm">
                        <button
                          className="right-0 top-0 absolute m-2 p-1 hover:text-amber-700"
                          onClick={() => setisOpen(false)}
                        >
                          X
                        </button>
                        <label>Ratings:</label>
                        <Rating
                          size="large"
                          sx={{ ":hover": { color: "orange" } }}
                          value={rating}
                          onChange={(e) => {
                            setRating(Number(e.target.value));
                          }}
                        />
                        <label>Comments:</label>
                        <textarea
                          rows={10}
                          cols={40}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="border-1 rounded-sm p-1.5 outline-none"
                        ></textarea>
                        <button
                          className="bg-amber-500 text-white ml-auto mt-3 p-[6px_10px] w-fit"
                          style={{ borderRadius: "20px" }}
                          onClick={createReviewHandler}
                        >
                          Submit Review
                        </button>
                      </Box>
                    </Modal>
                  </div>
                </div>
                <div className="reviews w-75 mt-3">
                  <h3>Other's Reviews:</h3>
                  <hr />
                  {product.reviews
                    ? product.reviews.map((review, i) => (
                        <ListReview key={i} review={review} />
                      ))
                    : null}
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ProductDetials;
