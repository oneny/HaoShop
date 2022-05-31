import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';
import { clearCart } from './cartSlice';

const initialState = {
  isLoading: false,
  error: null,
}

export const signin = createAsyncThunk(
  "auth/signin",
  async (_user, thunkAPI) => {
    try {
      const res = await axios.post("/auth/signin", _user);
      const { token, user } = res.data; // 서버에서 반환
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (thunk, thunkAPI) => {
    try {
      localStorage.clear();
      thunkAPI.dispatch(clearCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // auth/signin
    [signin.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signin.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // auth/signout
    [signout.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signout.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export default authSlice.reducer;