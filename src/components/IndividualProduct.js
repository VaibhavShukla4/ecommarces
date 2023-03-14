import React from "react";

const IndividualProduct = ({ val, addToCart }) => {
  // console.log(individualProduct.ProductName);
  const handleAddToCart = () => {
    addToCart(val);
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={val.ProductImg} alt="product-img" />
      </div>
      <div className="product-text title">{val.ProductName}</div>
      <div className="product-text description">{val.ProductDescription}</div>
      <div className="product-text price">$ {val.Price}</div>
      <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>
        ADD TO CART
      </div>
    </div>
  );
};
export default IndividualProduct;
