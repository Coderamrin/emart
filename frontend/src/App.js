import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// dashboard components
import Home from "./pages/Dashboard/Home";
import NewProduct from "./pages/Dashboard/NewProduct";
import EditProduct from "./pages/Dashboard/EditProduct";

// auth components
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// shop components
import ShopHome from "./pages/Shop/ShopHome";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Shop/Product";
import Checkout from "./pages/Shop/Checkout";
import OrderPlaced from "./pages/Shop/OrderPlaced";

// cart
import Cart from "./pages/Shop/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/new-product" element={<NewProduct />} />
        <Route path="/dashboard/edit-product/:id" element={<EditProduct />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ShopHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order-placed" element={<OrderPlaced />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
