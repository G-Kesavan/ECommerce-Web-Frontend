import { useEffect, useState } from "react";
import MetaData from "../../utils/MetaData";
import { getProducts } from "../../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Product from ".././Products/Product";
import Loader from ".././Layout/Loader";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { Button, Rating, Slider, Typography } from "@mui/material";
import { FaFilter } from "react-icons/fa";

const SearchProduct = () => {
  const [isFilter, setIsFilter] = useState(false);
  const categorys = [
    "Electronics",
    "Mobile Phone",
    "Laptop",
    "Accessories",
    "Headphones",
    "Bike",
    "Food",
    "Books",
    "ClothesShoes",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const [category, setCategory] = useState(null);
  const [retings, setRatings] = useState(null);

  let min = 0;
  let max = 200000;
  const marks = [
    {
      value: min,
      label: `${min}₹`,
    },
    {
      value: max,
      label: `2L₹`,
    },
  ];
  const [price, setPrice] = useState([min, max]);
  const [sendPrice, setSendPrice] = useState(price);
  const handleChange = (event, newValue) => {
    setPrice(newValue);
    setCurrentPage(0);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, count } = useSelector(
    (state) => state.productsState
  );
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      return toast.error(error, { position: "bottom-center" });
    }
    dispatch(getProducts(currentPage, keyword, sendPrice, category, retings));
  }, [error, dispatch, currentPage, keyword, sendPrice, category, retings]);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Search Product"} />
          <h1 id="products_heading" className="ml-3 mr-3 flex justify-between">
            Search Products{" "}
            <i
              onClick={() => {
                setIsFilter(true);
              }}
              className="md:hidden m-[auto_5px_auto_auto] border-2 p-1 rounded-sm text-[12px] flex justify-center items-center flex-col text-orange-500"
            >
              <FaFilter size={20} /> Filter
            </i>
          </h1>
          <div id="products" className="mt-5 flex gap-4 w-[100%] p-3">
            <div
              onMouseUp={() => {
                setSendPrice(price);
              }}
              className={`${isFilter ? "col-12" : "col-2"} hidden md:block`}
              style={isFilter ? { display: "block" } : null}
            >
              <h5>Price:</h5>
              <p>{`${price[0]}₹ to ${price[1]}₹`}</p>
              <Slider
                getAriaLabel={() => "Price range"}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={min}
                max={max}
                step={100}
                marks={marks}
                sx={{
                  color: "#ffa500",
                  width: "fit",
                }}
              />
              <h5>Category:</h5>
              <ul>
                {categorys.map((category) => (
                  <li
                    key={category}
                    value={category}
                    onClick={(e) => {
                      setCategory(e.target.innerText), setCurrentPage(0);
                    }}
                    className="text-orange-400 cursor-pointer hover:text-orange-900"
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <h5>Ratings:</h5>
              <ul>
                {[5, 4, 3].map((star) => (
                  <li
                    key={star}
                    value={star}
                    onClick={(e) => {
                      setRatings(e.target.value), setCurrentPage(0);
                    }}
                    className="cursor-pointer"
                  >
                    <Rating readOnly value={star} />
                  </li>
                ))}
              </ul>
              <button
                className="ml-auto flex p-1.5 rounded-lg bg-amber-600 text-white md:hidden"
                onClick={() => {
                  setIsFilter(false);
                }}
              >
                Filler
              </button>
            </div>
            <div
              className="row col h-fit ml-auto mr-auto"
              style={isFilter ? { display: "none" } : null}
            >
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
            </div>
          </div>
          {count > 0 && count > resPerPage ? (
            <div className="d-flex justify-center center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={count}
                itemsCountPerPage={resPerPage}
                nextPageText="Next"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default SearchProduct;
