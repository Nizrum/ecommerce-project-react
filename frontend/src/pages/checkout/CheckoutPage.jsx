import { useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveryOptions, fetchPaymentSummary } from '../../features/cart/cartSlice';

export function CheckoutPage() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cartItems);
	const paymentSummary = useSelector((state) => state.cart.paymentSummary);
	const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

	useEffect(() => {
		dispatch(fetchDeliveryOptions());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchPaymentSummary());
	}, [dispatch, cart]);

	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/cart-favicon.png"
			/>
			<title>Checkout</title>

			<CheckoutHeader />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<OrderSummary deliveryOptions={deliveryOptions} />
					<PaymentSummary paymentSummary={paymentSummary} />
				</div>
			</div>
		</>
	);
}
