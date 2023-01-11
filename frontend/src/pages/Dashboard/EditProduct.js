import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, getMyProducts } from "../../features/shop/productSlice";

import DashboardLayout from "../../components/layouts/DashboardLayout";

const EditProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, isSucess, message } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = products.find((product) => product._id === id);

  const [data, setData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.images[0],
  });

  const { title, price, description, category, image } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ productData: data, id: id }));

    if (isSucess) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getMyProducts());
  }, [dispatch]);

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

export default EditProduct;
