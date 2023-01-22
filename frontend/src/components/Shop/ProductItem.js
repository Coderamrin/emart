import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div className="text-center mb-5 pb-4 hover:shadow-md">
      <img
        src={product.images[0]}
        alt={product.title}
        className={"w-[250px] h-[300px]"}
      />
      <div className="px-4">
        <Link
          to={`/shop/product/${product._id}`}
          className="pt-4 pb-2 inline-block text-2xl font-semibold hover:underline"
        >
          {product.title}
        </Link>
        <p className="text-lg">$ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
