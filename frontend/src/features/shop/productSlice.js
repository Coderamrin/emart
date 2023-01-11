import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_PROD;

const initialState = {
  products: [],
  product: null,
  message: null,
  error: false,
  loading: null,
  isSucess: null,
};

// get all the products
export const getProducts = createAsyncThunk(
  "product/all",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(URL + "/products");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get products by the current author
export const getMyProducts = createAsyncThunk(
  "product/my-products",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(URL + "/products/my-products", config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get single product
export const getSingleProduct = createAsyncThunk(
  "product/single-product",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(URL + `/products/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// add new product
export const addProduct = createAsyncThunk(
  "product/new",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        URL + "/products/new-product/",
        data,
        config
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (data, thunkAPI) => {
    const { title, price, description, category, image } = data.productData;

    console.log(data.productData);
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.put(
        URL + `/products/update-product/${data.id}`,
        {
          title,
          price,
          description,
          category,
          image,
        },
        config
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.delete(
        URL + `/products/delete-product/${id}`,
        config
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
      })

      .addCase(getMyProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.products = action.payload;
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
      })

      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.products.unshift(action.payload);
        state.message = "Product added successfully";
        toast("Product added successfully");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
        toast(action.payload);
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.products = state.products.map((product) => {
          return product._id === action.payload._id ? action.payload : product;
        });
        state.message = "Product updated successfully";
        toast("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
        toast(action.payload);
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = true;
        state.products = state.products.filter((product) => {
          return product._id !== action.payload.id;
        });
        state.message = "Product deleted successfully";
        toast("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSucess = false;
        state.message = action.payload;
        toast(action.payload);
      });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
