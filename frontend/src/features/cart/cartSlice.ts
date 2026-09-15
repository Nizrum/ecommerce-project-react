import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CartItem, DeliveryOption, PaymentSummary } from '../../types';
import type { AppDispatch, ThunkApiConfig } from '../../app/store';

export interface CartState {
	cartItems: CartItem[];
	paymentSummary: PaymentSummary | null;
	deliveryOptions: DeliveryOption[];
	loading: boolean;
	error: string;
	deleteLoading: boolean;
	deleteError: string;
	updateLoading: boolean;
	updateError: string;
	addLoading: boolean;
	addError: string;
	paymentSummaryLoading: boolean;
	paymentSummaryError: string;
	deliveryOptionsLoading: boolean;
	deliveryOptionsError: string;
}

interface DeleteCartItemParams {
	productId: string;
}

interface CartItemParams {
	productId: string;
	quantity: number;
}

const initialState: CartState = {
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

export const loadCart = createAsyncThunk<CartItem[]>(
	'cart/loadCart',
	async () => {
		const response = await axios.get<CartItem[]>(
			'/api/cart-items?expand=product',
		);
		return response.data;
	},
);

export const deleteCartItem = createAsyncThunk<
	void,
	DeleteCartItemParams,
	ThunkApiConfig
>('cart/deleteCartItem', async (params, { dispatch }) => {
	await axios.delete(`/api/cart-items/${params.productId}`);
	await dispatch(loadCart()).unwrap();
});

export const addCartItem = createAsyncThunk<
	void,
	CartItemParams,
	ThunkApiConfig
>('cart/addCartItem', async (params, { dispatch }) => {
	await axios.post('/api/cart-items', {
		productId: params.productId,
		quantity: params.quantity,
	});
	await dispatch(loadCart()).unwrap();
});

export const updateCartItemQuantity = createAsyncThunk<
	void,
	CartItemParams,
	ThunkApiConfig
>('cart/updateCartItemQuantity', async (params, { dispatch }) => {
	await axios.put(`/api/cart-items/${params.productId}`, {
		quantity: Number(params.quantity),
	});
	await dispatch(loadCart()).unwrap();
});

export const fetchPaymentSummary = createAsyncThunk<PaymentSummary>(
	'cart/fetchPaymentSummary',
	async () => {
		const paymentSummaryResponse = await axios.get<PaymentSummary>(
			'/api/payment-summary',
		);
		return paymentSummaryResponse.data;
	},
);

export const fetchDeliveryOptions = createAsyncThunk<DeliveryOption[]>(
	'cart/fetchDeliveryOptions',
	async () => {
		const deliveryOptionsResponse = await axios.get<DeliveryOption[]>(
			'/api/delivery-options?expand=estimatedDeliveryTime',
		);
		return deliveryOptionsResponse.data;
	},
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadCart.pending, (state) => {
			state.loading = true;
			state.error = '';
		});
		builder.addCase(loadCart.fulfilled, (state, action) => {
			state.loading = false;
			state.cartItems = action.payload;
		});
		builder.addCase(loadCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? 'Failed to load cart';
		});
		builder.addCase(deleteCartItem.pending, (state) => {
			state.deleteLoading = true;
			state.deleteError = '';
		});
		builder.addCase(deleteCartItem.fulfilled, (state) => {
			state.deleteLoading = false;
		});
		builder.addCase(deleteCartItem.rejected, (state, action) => {
			state.deleteLoading = false;
			state.deleteError = action.error.message ?? 'Failed to delete cart item';
		});
		builder.addCase(updateCartItemQuantity.pending, (state) => {
			state.updateLoading = true;
			state.updateError = '';
		});
		builder.addCase(updateCartItemQuantity.fulfilled, (state) => {
			state.updateLoading = false;
		});
		builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
			state.updateLoading = false;
			state.updateError = action.error.message ?? 'Failed to update cart item';
		});
		builder.addCase(addCartItem.pending, (state) => {
			state.addLoading = true;
			state.addError = '';
		});
		builder.addCase(addCartItem.fulfilled, (state) => {
			state.addLoading = false;
		});
		builder.addCase(addCartItem.rejected, (state, action) => {
			state.addLoading = false;
			state.addError = action.error.message ?? 'Failed to add cart item';
		});
		builder.addCase(fetchPaymentSummary.pending, (state) => {
			state.paymentSummaryLoading = true;
			state.paymentSummaryError = '';
		});
		builder.addCase(fetchPaymentSummary.fulfilled, (state, action) => {
			state.paymentSummaryLoading = false;
			state.paymentSummary = action.payload;
		});
		builder.addCase(fetchPaymentSummary.rejected, (state, action) => {
			state.paymentSummaryLoading = false;
			state.paymentSummaryError =
				action.error.message ?? 'Failed to fetch payment summary';
		});
		builder.addCase(fetchDeliveryOptions.pending, (state) => {
			state.deliveryOptionsLoading = true;
			state.deliveryOptionsError = '';
		});
		builder.addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
			state.deliveryOptionsLoading = false;
			state.deliveryOptions = action.payload;
		});
		builder.addCase(fetchDeliveryOptions.rejected, (state, action) => {
			state.deliveryOptionsLoading = false;
			state.deliveryOptionsError =
				action.error.message ?? 'Failed to fetch delivery options';
		});
	},
});

export default cartSlice.reducer;
