import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const initialState = {
  product: {},
  products: [],
  brandData: [],
  brandAll: [],
  total: 0,
  perPage: 20,
  _currentPage: 1,
  _sort: "timestamps",
  _brands: [], // checked brands
  _brand: "", // 브랜드 영역에서 사용
  isLoading: false,
};

export const getProductsByCategories = createAsyncThunk(
  "product/getProductsByCategories",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/cate`, payload);
      thunkAPI.dispatch(saveFeatures(payload));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByBrand = createAsyncThunk(
  "product/getProductsByBrand",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`/products/brand`, payload);
      thunkAPI.dispatch(saveFeatures(payload));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBrands = createAsyncThunk(
  "product/getBrands",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/products/brands`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveFeatures: (state, action) => {
      state._currentPage = action.payload.currentPage;
      state._sort = action.payload.sort;
      state._brands = action.payload.brands;
      state._brand = action.payload.brand;
    },
    clearFeatures: (state, action) => {
      state._currentPage = 1;
      state._sort = "timestamps";
      state._brands = [];
      state._brand = null;
    },
  },
  extraReducers: {
    // product/getProductsByCategories
    [getProductsByCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByCategories.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.brandData = action.payload.brandData;
      state.total = action.payload.total;
      state.isLoading = false;
    },
    [getProductsByCategories.rejected]: (state) => {
      state.isLoading = false;
    },
    // product/getProductsByCategories
    [getProductsByBrand.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsByBrand.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.brandData = [];
      state.total = action.payload.total;
      state.isLoading = false;
    },
    [getProductsByBrand.rejected]: (state) => {
      state.isLoading = false;
    },
    // product/getBrands
    [getBrands.pending]: (state) => {
      state.isLoading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brandAll = action.payload.brandAll;
      state.isLoading = false;
    },
    [getBrands.rejected]: (state) => {
      state.isLoading = false;
    },
    // product/getProduct
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.isLoading = false;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});

export const { saveFeatures, clearFeatures } = productSlice.actions;

export default productSlice.reducer;