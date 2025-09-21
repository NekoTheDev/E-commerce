import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để fetch sản phẩm từ backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 8 }: { page?: number; limit?: number }) => {
    // Sử dụng đúng địa chỉ backend khi chạy local
    const res = await fetch('http://localhost:3001/api/products?page=' + page + '&limit=' + limit);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products || [];
  }
);
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/lib/types';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
