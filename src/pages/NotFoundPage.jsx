import { Header } from '../components/Header';
import './NotFoundPage.css';

export function NotFoundPage({ cart }) {
	return (
		<>
			<link
				rel="icon"
				type="image/svg+xml"
				href="/home-favicon.png"
			/>
			<title>Page not found</title>

			<Header cart={cart} />

			<div className="not-found-text">
				<span>Page not found...</span>
			</div>
		</>
	);
}
