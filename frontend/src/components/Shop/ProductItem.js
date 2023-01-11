import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>

      <div>
        <Link to={"/product:id"} className="btn bg-blue-800 hover:bg-blue-900">
          Preview
        </Link>
        <Link to={"/product:id"} className="btn bg-blue-800 hover:bg-blue-900">
          Edit
        </Link>
        <Link to={"/product:id"} className="btn bg-blue-800 hover:bg-blue-900">
          Delete
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
