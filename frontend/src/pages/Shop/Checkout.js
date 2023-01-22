import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopLayout from "../../components/layouts/ShopLayout";

const Checkout = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    zipcode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order-placed");
  };

  return (
    <>
      <ShopLayout>
        <>
          <form className="form mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold my-5">
              Fill Your Shipping Address
            </h1>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Name"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="phone"
                id="phone"
                name="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="street"
                id="street"
                name="street"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="city"
                id="city"
                name="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="zipcode"
                id="zipcode"
                name="zipcode"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipcode">Payment</label>

              <select>
                <option value="Cash on delivery">Cash on deliver</option>
                <option value="Cash on delivery">B-kash </option>
              </select>
            </div>

            <button className="btn btn-primary">Continue</button>
          </form>
        </>
      </ShopLayout>
    </>
  );
};

export default Checkout;
