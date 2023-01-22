import React, { useEffect } from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductItem from "../../components/Shop/ProductItem";
import Loading from "../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/shop/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [products, dispatch]);

  if (loading) {
    return (
      <ShopLayout>
        <Loading />
      </ShopLayout>
    );
  }

  return (
    <>
      <ShopLayout>
        <section>
          <h1 className="text-5xl font-bold pt-10 pl-5">Shop with us</h1>
          {products.length > 0 && (
            <p className="text-2xl pt-5 pb-20 pl-5">
              Explore more than {products.length} products.
            </p>
          )}

          <div className="shop-grid flex flex-wrap gap-10 justify-around">
            {products.length > 0 ? (
              <>
                {products.map((product, i) => (
                  <ProductItem product={product} key={i} />
                ))}
              </>
            ) : (
              <div>
                <p className="text-2xl pt-5 pb-20 pl-5">
                  No products available. Try again later
                </p>
              </div>
            )}
          </div>
        </section>
      </ShopLayout>
    </>
  );
};

export default Shop;
