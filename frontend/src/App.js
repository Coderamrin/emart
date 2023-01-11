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
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
