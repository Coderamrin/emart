import React, { useEffect } from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/shop/productSlice";

const ShopHome = () => {
  const categoryData = [
    {
      title: "Women's clothes",
      image: "https://api.lorem.space/image/fashion?w=200&h=250",
      link: "/shop",
    },
    {
      title: "Men's clothes",
      image: "https://api.lorem.space/image/fashion?w=201&h=251",
      link: "/shop",
    },
    {
      title: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=200&h=250",
      link: "/shop",
    },
    {
      title: "Watches",
      image: "https://api.lorem.space/image/watch?w=200&h=250",
      link: "/shop",
    },
  ];

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }

    console.log(products.slice(-6));
  }, [products, dispatch]);

  return (
    <>
      <ShopLayout>
        <section className="hero">
          <h1 className="text-6xl mb-10 text-white font-bold">
            Shop anything while <br /> sitting at home.
          </h1>

          <Link
            to={"/shop"}
            className="px-10 py-5 fon-bold text-xl btn-primary"
          >
            Shop now!
          </Link>
        </section>

        <section className="category py-10 flex justify-center gap-10 text-center">
          {categoryData.map((item, i) => (
            <div className="relative" key={i}>
              <img src={item.image} alt={item.title} />
              <div className="opacity-0 hover:opacity-100  absolute bg-[#009dff4d] text-white font-bold h-[100%] pt-20 top-0 bottom-0 left-0 right-0">
                <h5 className="text-lg font-medium-bold mt-4">{item.title}</h5>
                <Link
                  to={item.link}
                  className="btn btn-primary mt-2 inline-block"
                >
                  Shop
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className="new-arrival py-10">
          <h2 className="text-center text-5xl font-bold">
            New <br /> Arrival
          </h2>
        </section>
      </ShopLayout>
    </>
  );
};

export default ShopHome;
