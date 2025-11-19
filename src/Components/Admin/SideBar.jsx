import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdListAlt,
  MdDashboard,
  MdRateReview,
} from "react-icons/md";
import { FaPlus, FaProductHunt } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="col-12 col-md-3 col-lg-2 p-0">
      <nav id="sidebar" className="md:min-h-[90vh] h-full">
        <ul className="list-unstyled components">
          <li>
            <Link
              to={"/admin/dashboard"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <MdDashboard />
              &ensp;Dashboard
            </Link>
          </li>

          <li>
            <Link
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="text-nowrap"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <span className="flex items-center">
                <FaProductHunt size={18} /> &ensp;Products
              </span>
              <i>{showMenu ? <MdArrowDropUp /> : <MdArrowDropDown />}</i>
            </Link>
            <ul style={!showMenu ? { display: "none" } : null}>
              <li>
                <Link to={"/admin/products"}>All</Link>
              </li>
              <li>
                <Link
                  style={{ display: "flex" }}
                  className="items-center justify-between"
                  to={"/admin/create-product"}
                >
                  Create <FaPlus />
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to={"/admin/Orders"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <MdListAlt size={18} />
              &ensp;Orders
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/users"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaUsersCog size={18} />
              &ensp;Users
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/reviews"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <MdRateReview size={18} />
              &ensp;Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
