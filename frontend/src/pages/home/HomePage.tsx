import { ProductsGrid } from './ProductsGrid';
import { Header } from '../../components/Header';
import './HomePage.css';

export function HomePage() {
	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/home-favicon.png"
			/>
			<title>Ecommerce Project</title>

			<Header />

			<div className="home-page">
				<ProductsGrid />
			</div>
		</>
	);
}
