import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Order } from '../../types';

export interface OrdersState {
	orders: Order[];
	loading: boolean;
	error: string;
	createOrderLoading: boolean;
	createOrderError: string;
}

const initialState: OrdersState = {
	orders: [],
	loading: false,
	error: '',
	createOrderLoading: false,
	createOrderError: '',
};

export const fetchOrders = createAsyncThunk<Order[]>(
	'orders/fetchOrders',
	async () => {
		const response = await axios.get<Order[]>('/api/orders?expand=products');
		return response.data;
	},
);

export const createOrder = createAsyncThunk(
	'orders/createOrder',
	async () => {
		await axios.post('/api/orders');
	},
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.pending, (state) => {
			state.loading = true;
			state.error = '';
		});
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.loading = false;
			state.orders = action.payload;
		});
		builder.addCase(fetchOrders.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? 'Failed to fetch orders';
		});
		builder.addCase(createOrder.pending, (state) => {
			state.createOrderLoading = true;
			state.createOrderError = '';
		});
		builder.addCase(createOrder.fulfilled, (state) => {
			state.createOrderLoading = false;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.createOrderLoading = false;
			state.createOrderError =
				action.error.message ?? 'Failed to create order';
		});
	},
});

export default ordersSlice.reducer;
