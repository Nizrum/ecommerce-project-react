import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import './TrackingPage.css';

export function TrackingPage() {
	const { orderId, productId } = useParams();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchTrackingData = async () => {
			const orderResponse = await axios.get(
				`/api/orders/${orderId}?expand=products`,
			);
			setOrder(orderResponse.data);
		};

		fetchTrackingData();
	}, [orderId]);

	if (!order) {
		return null;
	}

	const orderProduct = order.products.find((orderProduct) => {
		return orderProduct.productId === productId;
	});

	const totalDeliveryTimeMs =
		orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
	const deliveryProgressPercent =
		timePassedMs / totalDeliveryTimeMs > 1
			? 100
			: (timePassedMs / totalDeliveryTimeMs) * 100;
	const isPreparing = deliveryProgressPercent < 33;
	const isShipping =
		deliveryProgressPercent >= 33 && deliveryProgressPercent < 100;
	const isDelivered = deliveryProgressPercent === 100;

	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/tracking-favicon.png"
			/>
			<title>Tracking</title>

			<Header />

			<div className="tracking-page">
				<div className="order-tracking">
					<Link
						className="back-to-orders-link link-primary"
						to="/orders">
						View all orders
					</Link>

					<div className="delivery-date">
						{isDelivered ? 'Delivered on ' : 'Arriving on '}
						{dayjs(orderProduct.estimatedDeliveryTimeMs).format(
							'dddd, MMMM D',
						)}
					</div>

					<div className="product-info">{orderProduct.product.name}</div>

					<div className="product-info">Quantity: {orderProduct.quantity}</div>

					<img
						className="product-image"
						src={orderProduct.product.image}
					/>

					<div className="progress-labels-container">
						<div
							className={`progress-label ${isPreparing && 'current-status'}`}>
							Preparing
						</div>
						<div
							className={`progress-label ${isShipping && 'current-status'}`}>
							Shipped
						</div>
						<div
							className={`progress-label ${isDelivered && 'current-status'}`}>
							Delivered
						</div>
					</div>

					<div className="progress-bar-container">
						<div
							className="progress-bar"
							style={{ width: `${deliveryProgressPercent}%` }}></div>
					</div>
				</div>
			</div>
		</>
	);
}
