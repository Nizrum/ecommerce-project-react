import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product } from '../../types';

interface FetchProductsParams {
	searchText: string;
}

export interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string;
}

const initialState: ProductsState = {
	products: [],
	loading: false,
	error: '',
};

export const fetchProducts = createAsyncThunk<Product[], FetchProductsParams>(
	'products/fetchProducts',
	async (params) => {
		const query = params?.searchText?.trim()
			? `?search=${encodeURIComponent(params.searchText.trim())}`
			: '';
		const response = await axios.get<Product[]>(`/api/products${query}`);
		return response.data;
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
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
			state.error = action.error.message ?? 'Failed to fetch products';
		});
	},
});

export default productsSlice.reducer;
