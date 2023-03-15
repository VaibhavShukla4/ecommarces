import React from "react";
import IndividualProduct from "./IndividualProduct";

const Products = ({ products, addToCart, searchTerm, user = { user } }) => {
  console.log(products);

  return products
    .filter((val) => {
      console.log(val);
      if (searchTerm == "") {
        return val;
      } else if (
        val.ProductDescription.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    })
    .map((val) => (
      <IndividualProduct
        key={val.ID}
        val={val}
        addToCart={addToCart}
        user={user}
      />
    ));
};
export default Products;
