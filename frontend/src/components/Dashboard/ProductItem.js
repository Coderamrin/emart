import React from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../features/shop/productSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="bg-gray-200 p-5 mb-4">
      <h2 className="mb-4">{product.title}</h2>

      <div>
        <Link
          to={`/product/${product._id}`}
          className="btn mr-4 bg-blue-800 hover:bg-blue-900"
        >
          Preview
        </Link>
        <Link
          to={`/dashboard/edit-product/${product._id}`}
          className="btn mr-4 bg-blue-700 hover:bg-blue-800"
        >
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
