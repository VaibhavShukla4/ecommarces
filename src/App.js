import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import AddProductsPage from "./components/AddProductsPage";
import Cart from "./components/Cart";
import Account from "./routes/Account";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Account />}>
            <Route index element={<Home />} />
            <Route path="/addproductspage" element={<AddProductsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
