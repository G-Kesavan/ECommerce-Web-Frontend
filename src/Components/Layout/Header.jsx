import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { Avatar, Button, Typography } from "@mui/material";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authState);
  const { items: cartItem } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
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

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <SearchBar />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center items-center justify-center flex">
        {!isAuthenticated ? (
          <Button sx={{ bgcolor: "#fa9c23", fontWeight: "500" }}>
            <Link
              className="text-white"
              style={{ textDecoration: "none" }}
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
                <Typography sx={{ fontWeight: "500", lineHeight: "100%" }}>
                  {user.name.slice(0, 9)}
                </Typography>
              </MenuButton>
              <Menu>
                <MenuItem>
                  <Button>
                    <Link
                      style={{ color: "#fa9c23", textDecoration: "none" }}
                      to={`/profile`}
                    >
                      Profile
                    </Link>
                  </Button>
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
          className="justify-center items-center flex flex-col m-1 ml-2"
        >
          <span className="m-1 items-center flex justify-center text-orange-300 leading-0">
            {cartItem.length}
          </span>
          <span className="m-0">
            <TiShoppingCart fontSize={30} className="text-orange-300" />
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
