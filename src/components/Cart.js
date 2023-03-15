import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, fs } from "../config/Config";
import { CartProducts } from "./CartProducts";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

toast.configure();

const Cart = () => {
  // show modal state
  const [showModal, setShowModal] = useState(false);

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);

  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);

  // getting cart products from firestore collection and updating the state
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  // console.log(cartProducts);

  // getting the qty from cartProducts in a seperate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // console.log(totalQty);

  // getting the TotalProductPrice from cartProducts in a seperate array
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.Price;
  });
  console.log(cartProducts);
  // console.log(cartProducts.TotalProductPrice);

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;
  // console.log(price);
  const totalPrice = price.reduce(reducerOfPrice, 0);
  // console.log(price);
  let newPrice = price.map(Number);
  console.log(newPrice);
  // console.log(totalPrice);
  console.log(newPrice);
  let sum = 0;
  newPrice.forEach((x) => {
    sum += x;
  });

  console.log(sum);

  // console.log(sum);
  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    console.log(Product);
    Product.TotalProductPrice = Product.qty * Product.price;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    console.log(Product);
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;
      // updating in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("Cart " + user.uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log("decrement");
            });
        } else {
          console.log("user is not logged in to decrement");
        }
      });
    }
  };

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // charging payment
  const navigate = useNavigate();
  const handleToken = async (token) => {
    console.log(token);
    const cart = { name: "All Products", sum };
    const response = await axios.post("http://localhost:3000/checkout", {
      token,
      cart,
    });
    console.log(response);
    let { status } = response.data;
    console.log(status);
    if (status === "success") {
      navigate("/");
      toast.success("Your order has been placed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      const uid = auth.currentUser.uid;
      const carts = await fs.collection("Cart " + uid).get();
      for (var snap of carts.docs) {
        fs.collection("Cart " + uid)
          .doc(snap.id)
          .delete();
      }
    } else {
      alert("Something went wrong in checkout");
    }
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      {cartProducts.length > 0 && (
        <div className="container-fluid main_Container">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
          <div className="summary-box">
            <h5>Cart Summary</h5>
            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {sum}</span>
            </div>
            <br></br>
            <StripeCheckout
              stripeKey="pk_test_51MlPF4SHtMWqyzXNi69BlCPvcTBdvPX9WPUQ9nBt4B9uqWXHj36nio2STunoq71S8AWL8dtVIgxMwai4NO0beFhn00jPUbMcKZ"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All Products"
              amount={sum * 100}
            ></StripeCheckout>
            <h6 className="text-center" style={{ marginTop: 7 + "px" }}>
              OR
            </h6>
            <button
              className="btn btn-secondary btn-md"
              onClick={() => setShowModal(true)}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}

      {showModal === true && (
        <Modal
          TotalPrice={sum}
          totalQty={totalQty}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
export default Cart;
