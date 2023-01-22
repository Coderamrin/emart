import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShopLayout from "../../components/layouts/ShopLayout";
import Loading from "../../components/Loading";
import CartItem from "../../components/Cart/CartItem";
import { getAllCarts } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { carts, totalPrice, loading } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (carts.length === 0) {
      dispatch(getAllCarts());
    }
  }, [dispatch, carts]);

  if (loading) {
    return (
      <ShopLayout>
        <Loading />
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="py-10 grid md:grid-cols-3 gap-10">
        <div className=" col-span-2">
          <div className="border-b-2 border-gray-200">
            {carts.map((cart) => (
              <CartItem cart={cart} key={cart._id} />
            ))}
          </div>

          <div className="text-2xl font-medium pt-5">
            Total Price: $ {totalPrice}
          </div>

          <Link to={"/checkout"} className="btn btn-primary mt-4 inline-block">
            Proceed to checkout
          </Link>
        </div>

        <div></div> 
      </div>
    </ShopLayout>
  );
};

export default Cart;
