import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { logout } from "react-icons-kit/iconic/logout";
import SearchBar from "./SearchBar";
import { naviconRound } from "react-icons-kit/ionicons/naviconRound";
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
    // <nav
    //   className=" navbar navbar-light bg-primary d-flex justify-content-center "
    //   style={{
    //     height: "100px",
    //   }}
    // >
    //   <div className="col-1">
    // <img
    //   className="navbar-brand"
    //   src={logo}
    //   alt="logo"
    //   style={{ width: "40px" }}
    //   onClick={() => navigate("/")}
    // />
    //   </div>
    //   <div className="col-9">
    //     <div className="d-flex justify-content-center">
    // {user && (
    //   <input
    //     id="searchInput"
    //     type="text"
    //     placeholder="Search here..."
    //     onChange={(event) => {
    //       setSearchTerm(event.target.value);
    //     }}
    //     className="form-control me-2"
    //     style={{ width: "400px" }}
    //   />
    // )}
    //     </div>
    //   </div>
    //   <div className="col-1">
    //     <div className="">
    // {user && (
    //   <div className="cart-menu-btn">
    //     <span className="user-name">{user}</span>
    //     <div className="btn btn-danger btn-md" onClick={handleLogout}>
    //       <Icon icon={logout} size={20} style={{ color: "white" }} />
    //       &nbsp; LOGOUT
    //     </div>
    //     <Link className="navlink mx-4" to="/cart">
    //       <Icon
    //         icon={shoppingCart}
    //         size={30}
    //         style={{ color: "black" }}
    //         onClick={() => navigate("./cart")}
    //       />
    //     </Link>
    //     <span className="cart-indicator">{totalProducts}</span>
    //   </div>
    // )}
    // {!user && (
    //   <>
    //     <Link to="signup">Sign Up</Link>
    //     <Link to="login">Login</Link>
    //   </>
    // )}
    //     </div>
    //   </div>

    //   <div className="leftside"></div>
    // </nav>
    <nav className="" style={{ position: "fixed" }}>
      <div className="navbar_">
        <img
          className="mr-2"
          src={logo}
          alt="logo"
          style={{ width: "40px" }}
          onClick={() => navigate("/")}
        />

        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
          <Icon icon={naviconRound} size={35} />
        </label>
        <ul>
          <li>
            {user && (
              <input
                id="searchInput"
                type="text"
                placeholder="Search here..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                className="form-control position-absolute top-50 start-50 translate-middle"
              />
            )}
          </li>
          <li>
            {user && (
              <>
                <span className="cart-menu-btn cart-indicator">
                  {totalProducts}
                </span>
                <Icon
                  icon={shoppingCart}
                  size={30}
                  style={{ color: "white" }}
                  onClick={() => navigate("/cart")}
                />
              </>
            )}
          </li>
          <li> {user && <span className="user-name">{user}</span>}</li>
          <li>
            {user && (
              <button className="btn btn-danger btn-md" onClick={handleLogout}>
                <Icon icon={logout} size={20} style={{ color: "white" }} />
                &nbsp; LOGOUT
              </button>
            )}
            {!user && (
              <li>
                <Link to="signup" style={{ color: "white" }}>
                  Sign Up
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="login" style={{ color: "white" }}>
                  Login
                </Link>
              </li>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
