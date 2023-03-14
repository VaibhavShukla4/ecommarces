import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { logout } from "react-icons-kit/iconic/logout";
import SearchBar from "./SearchBar";
const Navbar = ({ user, totalProducts, products, setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState([products]);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login ");
    });
  };

  // console.log(user);
  // console.log(totalProducts);
  // console.log(products);
  // console.log(setSearchTerm);
  return (
    <nav
      className=" navbar row  "
      style={{
        height: "100px",
      }}
    >
      <div className="col-4">
        <img
          src={logo}
          alt="logo"
          style={{ width: "40px" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-4">
        {user && (
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="form-control me-2"
            style={{ width: "400px" }}
          />
        )}
      </div>
      <div className="col-4">
        {user && (
          <div className="cart-menu-btn">
            <span className="user-name">{user}</span>
            <div className="btn btn-danger btn-md" onClick={handleLogout}>
              <Icon icon={logout} size={20} style={{ color: "white" }} />
              &nbsp; LOGOUT
            </div>
            <Link className="navlink mx-4" to="/cart">
              <Icon
                icon={shoppingCart}
                size={30}
                style={{ color: "black" }}
                onClick={() => navigate("./cart")}
              />
            </Link>
            <span className="cart-indicator">{totalProducts}</span>
          </div>
        )}
        {!user && (
          <>
            <Link to="signup">Sign Up</Link>
            <Link to="login">Login</Link>
          </>
        )}
      </div>

      <div className="leftside"></div>
    </nav>
  );
};

export default Navbar;
