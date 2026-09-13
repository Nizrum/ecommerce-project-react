import { Product } from './Product';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';

export function ProductsGrid() {
	const [searchParams] = useSearchParams();
	const search = searchParams.get('search');
	const products = useSelector((state) => state.products.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts({ searchText: search }));
	}, [dispatch, search]);

	return (
		<div className="products-grid">
			{products.map((product) => {
				return (
					<Product
						key={product.id}
						product={product}
					/>
				);
			})}
		</div>
	);
}
