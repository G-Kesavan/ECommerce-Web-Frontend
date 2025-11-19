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
    <nav className="navbar">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to={`/`}>
            <img
              width="160px"
              height="10px"
              src="/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 mt-2 mt-md-0">
        <SearchBar />
      </div>

      <div className="col-12 col-md-4 mt-4 mt-md-0 text-center items-center justify-center flex">
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
