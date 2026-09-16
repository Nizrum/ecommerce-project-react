import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import { useEffect } from 'react';
import { fetchOrders } from '../../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export function OrdersGrid() {
	const dispatch = useAppDispatch();
	const orders = useAppSelector((state) => state.orders.orders);
	const loading = useAppSelector((state) => state.orders.loading);
	const error = useAppSelector((state) => state.orders.error);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	if (loading) {
		return <div>Loading orders...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="orders-grid">
			{orders.map((order) => {
				return (
					<div
						key={order.id}
						className="order-container">
						<OrderHeader order={order} />
						<OrderDetails order={order} />
					</div>
				);
			})}
		</div>
	);
}
