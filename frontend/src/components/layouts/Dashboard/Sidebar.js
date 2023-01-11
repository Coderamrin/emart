import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <div>
      <div
        className={
          !toggle
            ? "sidebar md:left-0 left-[-100%]"
            : "sidebar left-0 md:left-[-100%]"
        }
      >
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/dashboard">Dashboard</Link>
          </h1>
          <button className="ml-2 bg-orange-600 px-1" onClick={handleToggle}>
            {!toggle ? "" : <AiOutlineClose size={20} />}
          </button>
        </div>

        <div className="sidebar-links mt-10">
          <ul>
            <Link to="/dashboard/new-product">New Product</Link>
            <Link to="/dashboard/edit-author">Edit Author</Link>
          </ul>
        </div>

        <div className="mt-auto">
          <button className="btn btn-danger" onClick={handleLogout}>
            {" "}
            Logout
          </button>
        </div>
      </div>

      <div className="md:pl-[250px]">
        <ul className="p-5 flex items-center bg-gray-100">
          <li className="mr-5" onClick={handleToggle}>
            {" "}
            <AiOutlineMenu size={20} />{" "}
          </li>

          <Link to={"/"}>Home</Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
