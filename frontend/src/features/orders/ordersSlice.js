import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
	loading: false,
	error: '',
	createOrderLoading: false,
	createOrderError: '',
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
	const response = await axios.get('/api/orders?expand=products');
	return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async () => {
	const response = await axios.post('/api/orders');
	return response.data;
});

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.loading = false;
			state.orders = action.payload;
		});
		builder.addCase(fetchOrders.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(createOrder.pending, (state) => {
			state.createOrderLoading = true;
		});
		builder.addCase(createOrder.fulfilled, (state) => {
			state.createOrderLoading = false;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.createOrderLoading = false;
			state.createOrderError = action.error.message;
		});
	},
});

export default ordersSlice.reducer;
