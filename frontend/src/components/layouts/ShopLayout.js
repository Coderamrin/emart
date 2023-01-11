import React from "react";
import Header from "./Shop/Header";
import Footer from "./Shop/Footer";

const ShopLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default ShopLayout;
