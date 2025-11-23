import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { Avatar, Button, Typography } from "@mui/material";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authState);
  const { items: cartItem } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFun = () => {
    dispatch(logout());
  };
  return (
    <nav style={{display:'grid'}} className="grid-cols-[2] grid-rows-[2] md:grid-cols-[3] md:grid-rows-[1]" >
      <div className="col-start-1 col-end-2">
          <Link to={`/`} className="flex items-center justify-start" >
            <img
              width="120px"
              height="10px"
              src="/images/logo_use.png"
              alt="logo"
            />
          </Link>
      </div>

      <div className="col-end-3 col-start-1 md:col-start-2 md:col-end-3 mt-3 mt-md-2 items-center justify-center">
        <SearchBar />
      </div>

      <div className="row-start-1 col-start-2 col-end-3 md:col-start-3 md:col-end-4 text-center items-center justify-end flex">
        {!isAuthenticated ? (
          <Button sx={{ bgcolor: "#fa9c23", fontWeight: "500" }}>
            <Link
              className="text-white"
              style={{ textDecoration: "none", padding: "6px 10px" }}
              to={`/login`}
            >
              login
            </Link>
          </Button>
        ) : (
          <>
            <Dropdown>
              <MenuButton
                sx={{
                  gap: "5px",
                  border: "none",
                  bgcolor: "#fa9c23",
                  padding: "6px 10px",
                }}
              >
                <Avatar src={user.avatar} alt={user.name} />
                <Typography
                  sx={{
                    fontWeight: "500",
                    lineHeight: "100%",
                    textWrap: "nowrap",
                  }}
                >
                  {user.name.slice(0, 9)}
                </Typography>
              </MenuButton>
              <Menu className="pl-2 pr-2">
                {user.role === "admin" && (
                  <MenuItem onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/my-order")}>
                  Orders
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={logoutFun}
                    sx={{ color: "white", bgcolor: "red" }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Dropdown>
          </>
        )}
        <Link
          to={"/cart"}
          style={{ textDecoration: "none" }}
          className="flex flex-col text-nowrap ml-3 hover:border-white border-2 border-amber-500 rounded-md place-items-center p-[5px_10px]"
        >
          <TiShoppingCart
            className="hover:text-white text-orange-300 leading-0"
            size={22}
          />
          <span className="leading-[100%] hover:text-white text-orange-300">
            Cart {cartItem.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
