import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		const fetchCheckoutData = async () => {
			const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
			setDeliveryOptions(deliveryOptionsResponse.data);

			const paymentSummaryResponse = await axios.get('/api/payment-summary')
			setPaymentSummary(paymentSummaryResponse.data);
		};

		fetchCheckoutData();
	}, []);

	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/cart-favicon.png"
			/>
			<title>Checkout</title>

			<CheckoutHeader cart={cart} />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<OrderSummary
						cart={cart}
						deliveryOptions={deliveryOptions}
					/>
					<PaymentSummary paymentSummary={paymentSummary} />
				</div>
			</div>
		</>
	);
}
