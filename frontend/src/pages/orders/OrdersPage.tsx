import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';

export function OrdersPage() {
	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/orders-favicon.png"
			/>
			<title>Orders</title>

			<Header />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>
				<OrdersGrid />
			</div>
		</>
	);
}
