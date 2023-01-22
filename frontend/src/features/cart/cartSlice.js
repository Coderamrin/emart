import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_API_PROD;

const carts = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  carts: carts ? carts : [],
  totalPrice: 0,
  message: null,
  error: false,
  loading: null,
  isSucess: null,
};

// get all the cart
export const getAllCarts = createAsyncThunk("cart/all", async (_, thunkAPI) => {
  try {
    const id = thunkAPI.getState().auth.user._id;

    const res = await axios.get(URL + `/cart/find/${id}`);

    localStorage.setItem("cart", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(URL + `/cart/add`, data, config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCartItem = createAsyncThunk(
  "cart/edit",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.put(
        URL + `/cart/update/${data.id}`,
        { quantity: data.quantity },
        config
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.delete(URL + `/cart/delete/${id}`, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Got all the carts";
        state.error = false;
        state.carts = action.payload;
        state.totalPrice = action.payload
          .map((item) => item.productPrice * item.quantity)
          .reduce((sum, next) => sum + next, 0);
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast(action.payload);
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Added to cart successfully";
        state.error = false;

        const exist = state.carts.some(
          (cart) => cart._id === action.payload._id
        );

        if (exist) {
          state.carts = state.carts.map((cart) => {
            return cart._id === action.payload._id
              ? { ...cart, quantity: action.payload.quantity }
              : cart;
          });
        } else {
          state.carts.unshift(action.payload);
        }

        state.totalPrice = state.carts
          .map((item) => item.productPrice * item.quantity)
          .reduce((sum, next) => sum + next, 0);
        toast("Added to cart successfully");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast(action.payload);
      })
      .addCase(editCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Updated item successfully";
        state.error = false;
        state.carts = state.carts.map((cart) => {
          return cart._id === action.payload._id ? action.payload : cart;
        });

        state.totalPrice = state.carts
          .map((item) => item.productPrice * item.quantity)
          .reduce((sum, next) => sum + next, 0);
        toast("Updated item successfully");
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast(action.payload);
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Deleted item successfully";
        state.error = false;
        state.carts = state.carts.filter((cart) => {
          return cart._id !== action.payload.id;
        });

        state.totalPrice = state.carts
          .map((item) => item.productPrice * item.quantity)
          .reduce((sum, next) => sum + next, 0);

        toast("Deleted item successfully");
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        toast(action.payload);
      });
  },
});

export default cartSlice.reducer;
