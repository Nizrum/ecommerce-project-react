import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../../features/orders/ordersSlice';

export function OrdersGrid() {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders.orders);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

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
