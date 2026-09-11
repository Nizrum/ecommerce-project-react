import { ProductsGrid } from './ProductsGrid';
import { Header } from '../../components/Header';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/home-favicon.png"
			/>
			<title>Ecommerce Project</title>

			<Header cart={cart} />

			<div className="home-page">
				<ProductsGrid loadCart={loadCart} />
			</div>
		</>
	);
}
