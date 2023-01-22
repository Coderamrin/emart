import React from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <ShopLayout>
      <div className="text-center mt-10">
        <p className="py-10">
          Your order placed successfully. You'll get the product in 5 to 7 days.
        </p>
        <Link to={"/shop"} className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </ShopLayout>
  );
};

export default OrderPlaced;
