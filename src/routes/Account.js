import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Account = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
};

export default Account;
