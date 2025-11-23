import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchFun = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname == "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <form onSubmit={searchFun} className="items-center justify-center flex">
      <div className="input-group m-0">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          required
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
