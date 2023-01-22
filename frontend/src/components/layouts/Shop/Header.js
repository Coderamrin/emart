import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleToggle = () => setToggle(!toggle);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className=" px-5 py-5 text-gray-900 shadow-bottom">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="logo font-bold text-2xl">
          Emart
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center">
          <Link className="px-3" to="/shop">
            Shop
          </Link>
          <Link className="px-3" to="/cart">
            Cart
          </Link>
          <Link className="px-3" to="/">
            Blog
          </Link>
          <Link className="px-3" to="/">
            Contact
          </Link>
          <Link className="px-3" to="/">
            About
          </Link>

          {user ? (
            <>
              <Link className="px-3" to="/dashboard">
                Dashboard
              </Link>
              <button className="px-3 btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className=" btn btn-primary mx-2" to="/login">
                Login
              </Link>

              <Link className="btn btn-primary ml-2" to="/login">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* mobile nav */}
        <nav
          className={
            !toggle
              ? "flex flex-col w-[100%] md:hidden absolute top-[4rem] left-0 py-5 bg-gray-800 duration-500 h-screen"
              : "flex flex-col w-[100%] md:hidden absolute top-[4rem] left-[-100%] py-5 bg-gray-800 duration-500 h-screen"
          }
        >
          <Link className="px-5 py-2" to="/">
            Home
          </Link>
          <Link className="px-5 py-2" to="/">
            Shop
          </Link>
          <Link className="px-5 py-2" to="/">
            Cart
          </Link>
          <Link className="px-5 py-2" to="/">
            Blog
          </Link>
          <Link className="px-5 py-2" to="/">
            Contact
          </Link>
          <Link className="px-5 py-2" to="/">
            About
          </Link>
        </nav>

        {/* toggle button */}
        <button className="block md:hidden" onClick={handleToggle}>
          <AiOutlineMenu size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
