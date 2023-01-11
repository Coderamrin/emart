import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProducts } from "../../features/shop/productSlice";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ProductItem from "../../components/Dashboard/ProductItem";
import Loading from "../../components/Loading";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (products.length === 0) {
      dispatch(getMyProducts());
    }
  }, [getMyProducts]);

  if (loading) {
    <DashboardLayout>
      <Loading />
    </DashboardLayout>;
  }

  return (
    <DashboardLayout>
      {products &&
        products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
    </DashboardLayout>
  );
};

export default Home;
