import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreasItemQuantity,
  deleteItem,
  increasItemQuantity,
} from "../../actions/cartAction";
import { Fragment } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartState);
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="container container-fluid">
          <h1 className="mt-5">Cart is empty</h1>
        </div>
      ) : (
        <div className="container container-fluid">
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length}</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              <hr />
              <div className="cart-item">
                {cartItems.map((item) => (
                  <Fragment key={item._id}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">₹{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              dispatch(
                                decreasItemQuantity(item._id, item.quantity)
                              )
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              dispatch(
                                increasItemQuantity(
                                  item._id,
                                  item.quantity,
                                  item.stock
                                )
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => dispatch(deleteItem(item._id))}
                        ></i>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    ₹
                    {cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
