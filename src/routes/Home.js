import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { auth, fs } from "../config/Config";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Home = () => {
  // getting current user uid
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      setLoading(true);
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
        setLoading(false);
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

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

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          // console.log("successfully added to cart");
          toast.success("successfully added to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        });
    }
  };
  // console.log(products);
  return (
    <>
      <Navbar
        user={user}
        totalProducts={totalProducts}
        products={products}
        setSearchTerm={setSearchTerm}
      />
      <br></br>
      <div className="main_Container">
        {loading ? (
          <Loading />
        ) : (
          <>
            {products.length > 0 && (
              <div className="container-fluid ">
                <h1 className="text-center">Products</h1>
                <div className="products-box">
                  <Products
                    products={products}
                    addToCart={addToCart}
                    searchTerm={searchTerm}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Home;
