import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShopLayout from "../../components/layouts/ShopLayout";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;

  const { user, message, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(data));
    toast(message);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
        <div className="login-form">
          <form
            className="form mx-auto bg-blue-50 mt-20 py-26"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                placeholder="name"
                id="name"
                name="name"
                required
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Learn More
            </button>

            <div className="pt-4">
              Already registered?{" "}
              <Link to="/login" className="text-blue-900">
                {" "}
                Login{" "}
              </Link>
            </div>
          </form>
        </div>
      </ShopLayout>
    </>
  );
};

export default Register;
