import React from "react";
import IndividualCartProduct from "./IndividualCartProduct";

export const CartProducts = ({
  cartProducts,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  // console.log(cartProducts);
  // console.log(cartProductIncrease);
  // console.log(cartProductDecrease);
  return cartProducts.map((cartProduct) => (
    <IndividualCartProduct
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
    />
  ));
};
