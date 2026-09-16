import { Product } from './Product';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export function ProductsGrid() {
	const [searchParams] = useSearchParams();
	const search = searchParams.get('search') ?? '';
	const products = useAppSelector((state) => state.products.products);
	const dispatch = useAppDispatch();

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
