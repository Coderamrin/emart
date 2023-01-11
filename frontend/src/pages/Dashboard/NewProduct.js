import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/shop/productSlice";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Loading from "../../components/Loading";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const { loading, isSucess } = useSelector((state) => state.products);
  const { title, price, category, description, image } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      price,
      description,
      category,
      images: [image],
    };

    dispatch(addProduct(data));

    if (isSucess) {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter product title"
                required
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter product price"
                required
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter product category"
                required
                value={category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Enter product image"
                value={image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="btn btn-primary" type="submit">
              Add Product
            </button>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default NewProduct;
