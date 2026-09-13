import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cartItems: [],
	paymentSummary: null,
	deliveryOptions: [],
	loading: false,
	error: '',
	deleteLoading: false,
	deleteError: '',
	updateLoading: false,
	updateError: '',
	addLoading: false,
	addError: '',
	paymentSummaryLoading: false,
	paymentSummaryError: '',
	deliveryOptionsLoading: false,
	deliveryOptionsError: '',
};

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
	const response = await axios.get('/api/cart-items?expand=product');
	return response.data;
});

export const deleteCartItem = createAsyncThunk(
	'cart/deleteCartItem',
	async (params, { dispatch }) => {
		await axios.delete(`/api/cart-items/${params.productId}`);
		dispatch(loadCart());
	},
);

export const addCartItem = createAsyncThunk(
	'cart/addCartItem',
	async (params, { dispatch }) => {
		await axios.post('/api/cart-items', {
			productId: params.productId,
			quantity: params.quantity,
		});
		dispatch(loadCart());
	},
);

export const updateCartItemQuantity = createAsyncThunk(
	'cart/updateCartItemQuantity',
	async (params, { dispatch }) => {
		await axios.put(`/api/cart-items/${params.productId}`, {
			quantity: Number(params.quantity),
		});
		dispatch(loadCart());
	},
);

export const fetchPaymentSummary = createAsyncThunk(
	'cart/fetchPaymentSummary',
	async () => {
		const paymentSummaryResponse = await axios.get('/api/payment-summary');
		return paymentSummaryResponse.data;
	},
);

export const fetchDeliveryOptions = createAsyncThunk(
	'cart/fetchDeliveryOptions',
	async () => {
		const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
		return deliveryOptionsResponse.data;
	},
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(loadCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loadCart.fulfilled, (state, action) => {
			state.loading = false;
			state.cartItems = action.payload;
		});
		builder.addCase(loadCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteCartItem.pending, (state) => {
			state.deleteLoading = true;
		});
		builder.addCase(deleteCartItem.fulfilled, (state) => {
			state.deleteLoading = false;
		});
		builder.addCase(deleteCartItem.rejected, (state, action) => {
			state.deleteLoading = false;
			state.deleteError = action.error.message;
		});
		builder.addCase(updateCartItemQuantity.pending, (state) => {
			state.updateLoading = true;
		});
		builder.addCase(updateCartItemQuantity.fulfilled, (state) => {
			state.updateLoading = false;
		});
		builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
			state.updateLoading = false;
			state.updateError = action.error.message;
		});
		builder.addCase(addCartItem.pending, (state) => {
			state.addLoading = true;
		});
		builder.addCase(addCartItem.fulfilled, (state) => {
			state.addLoading = false;
		});
		builder.addCase(addCartItem.rejected, (state, action) => {
			state.addLoading = false;
			state.addError = action.error.message;
		});
		builder.addCase(fetchPaymentSummary.pending, (state) => {
			state.paymentSummaryLoading = true;
		});
		builder.addCase(fetchPaymentSummary.fulfilled, (state, action) => {
			state.paymentSummaryLoading = false;
			state.paymentSummary = action.payload;
		});
		builder.addCase(fetchPaymentSummary.rejected, (state, action) => {
			state.paymentSummaryLoading = false;
			state.paymentSummaryError = action.error.message;
		});
		builder.addCase(fetchDeliveryOptions.pending, (state) => {
			state.deliveryOptionsLoading = true;
		});
		builder.addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
			state.deliveryOptionsLoading = false;
			state.deliveryOptions = action.payload;
		});
		builder.addCase(fetchDeliveryOptions.rejected, (state, action) => {
			state.deliveryOptionsLoading = false;
			state.deliveryOptionsError = action.error.message;
		});
	},
});

export default cartSlice.reducer;
