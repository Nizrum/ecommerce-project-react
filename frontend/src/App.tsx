import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';
import { loadCart } from './features/cart/cartSlice';
import { useAppDispatch } from './app/hooks';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadCart());
	}, [dispatch]);

	return (
		<Routes>
			<Route
				index
				element={<HomePage />}
			/>
			<Route
				path="checkout"
				element={<CheckoutPage />}
			/>
			<Route
				path="orders"
				element={<OrdersPage />}
			/>
			<Route
				path="tracking/:orderId/:productId"
				element={<TrackingPage />}
			/>
			<Route
				path="*"
				element={<NotFoundPage />}
			/>
		</Routes>
	);
}

export default App;
