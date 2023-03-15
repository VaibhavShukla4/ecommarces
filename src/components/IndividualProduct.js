import React from "react";

const IndividualProduct = ({ val, addToCart, user }) => {
  // console.log(individualProduct.ProductName);
  const handleAddToCart = () => {
    addToCart(val);
  };
  return (
    <>
      {!user && (
        <div className="product">
          <div className="product-img">
            <img src={val.ProductImg} alt="product-img" />
          </div>
          <div className="product-text title">{val.ProductName}</div>
          <div className="product-text description">
            {val.ProductDescription}
          </div>
          <div className="product-text price">$ {val.Price}</div>
          <div
            className="btn btn-danger btn-md cart-btn"
            onClick={() => alert("Please first login then add to cart")}
          >
            ADD TO CART
          </div>
        </div>
      )}
      {user && (
        <div className="product">
          <div className="product-img">
            <img src={val.ProductImg} alt="product-img" />
          </div>
          <div className="product-text title">{val.ProductName}</div>
          <div className="product-text description">
            {val.ProductDescription}
          </div>
          <div className="product-text price">$ {val.Price}</div>
          <div
            className="btn btn-danger btn-md cart-btn"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </div>
        </div>
      )}
    </>
  );
};
export default IndividualProduct;
