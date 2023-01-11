import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShopLayout from "../../components/layouts/ShopLayout";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { user, loading, message } = useSelector((state) => state.auth);
  const { email, password } = data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(data));
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
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
                value={password}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary">Learn More</button>

            <div className="pt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-900">
                {" "}
                Register{" "}
              </Link>
            </div>
          </form>
        </div>
      </ShopLayout>
    </>
  );
};

export default Login;
