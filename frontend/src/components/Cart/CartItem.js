import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem, editCartItem } from "../../features/cart/cartSlice";

const CartItem = ({ cart }) => {
  const [quantity, setQuantity] = useState();

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
  };

  const handleUpdate = (data) => {
    dispatch(editCartItem(data));
  };

  return (
    <div>
      <div className="pb-5 flex items-start" key={cart._id}>
        <div>
          <img
            src={cart.productImages[0]}
            alt={cart.productTitle}
            className="w-[100px]"
          />
        </div>
        <div className="px-10 w-[65%]">
          <h3 className="text-2xl font-bold text-gray-800">
            {cart.productTitle}
          </h3>
          <p className="text-xl">${cart.productPrice}</p>
        </div>

        <div className="mr-5 flex">
          <input
            type="number"
            className="border-2 w-[80px]"
            value={quantity ? quantity : cart.quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />

          <button
            className="btn btn-primary inline-block mx-4"
            onClick={() => handleUpdate({ id: cart._id, quantity: +quantity })}
          >
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(cart._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
