import React, { useEffect, useState } from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct, reset } from "../../features/shop/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import Loading from "../../components/Loading";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const { product, loading } = useSelector((state) => state.products);

  const { id } = useParams();

  const handleClick = () => {
    if (product) {
      dispatch(addToCart({ quantity: +quantity, productId: product._id }));
      navigate("/cart");
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));

    return () => {
      dispatch(reset());
    };
  }, [id]);

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
        {product && (
          <div className="py-10 md:w-[80%] md:mx-auto flex gap-10">
            <div>
              <img src={product.images[0]} alt="" className="w-[600px]" />
            </div>
            <div className="pr-20 flex flex-col">
              <h1 className="text-5xl py-4">{product.title}</h1>
              <p className="text-2xl pt-2 font-bold"> ${product.price}</p>
              <p className="font-bold text-1xl py-2">Product Description:</p>
              <p>{product.description}</p>

              <div className="mt-auto flex items-center py-5">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-[100px] px-2 border border-gray-400 mr-2 inline-block"
                />

                <button className="btn btn-primary" onClick={handleClick}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </ShopLayout>
    </>
  );
};

export default Product;
