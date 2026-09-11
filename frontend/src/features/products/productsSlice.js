import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	loading: false,
	error: '',
};

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (params) => {
		const query = params?.searchText?.trim() ? `?search=${encodeURIComponent(params.searchText.trim())}` : '';
		const response = await axios.get(`/api/products${query}`);
		return response.data;
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default productsSlice.reducer;
