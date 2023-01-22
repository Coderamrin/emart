import React, { useEffect, useState } from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/shop/productSlice";
import ProductItem from "../../components/Shop/ProductItem";
import Loading from "../../components/Loading";
import {
  AiOutlineAlipayCircle,
  AiOutlineAlert,
  AiOutlineAccountBook,
} from "react-icons/ai";

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

  const [newArrival, setNewArrival] = useState([]);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }

    setNewArrival(products.slice(-10));
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

        <section className="new-arrival py-20 flex flex-col justify-center">
          <h2 className="text-center text-5xl font-bold pb-10">
            New <br /> Arrival
          </h2>

          <div className="new-arrival-grid flex flex-wrap justify-center gap-10">
            {newArrival.length > 0 ? (
              newArrival.map((product, i) => (
                <ProductItem product={product} key={i} />
              ))
            ) : (
              <Loading />
            )}
          </div>

          <Link to={"/shop"} className="px-7 py-4 font-lg btn-primary mx-auto">
            Browse More
          </Link>
        </section>

        <section className="features flex md:justify-center gap-10 p-20 mb-16 bg-gray-200">
          <div>
            <AiOutlineAlipayCircle size={60} />
            <h4 className="text-lg font-bold py-4">Fast Delivery</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              similique corporis, dolorem ipsam ratione dignissimos amet. Odit
              quasi sunt natus harum, dolorem assumenda, minus quos placeat
              laborum maxime tempora dignissimos.
            </p>
          </div>
          <div>
            <AiOutlineAccountBook size={60} />
            <h4 className="text-lg font-bold py-4">Fast Delivery</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              similique corporis, dolorem ipsam ratione dignissimos amet. Odit
              quasi sunt natus harum, dolorem assumenda, minus quos placeat
              laborum maxime tempora dignissimos.
            </p>
          </div>
          <div>
            <AiOutlineAlert size={60} />
            <h4 className="text-lg font-bold py-4">Fast Delivery</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              similique corporis, dolorem ipsam ratione dignissimos amet. Odit
              quasi sunt natus harum, dolorem assumenda, minus quos placeat
              laborum maxime tempora dignissimos.
            </p>
          </div>
        </section>
      </ShopLayout>
    </>
  );
};

export default ShopHome;
