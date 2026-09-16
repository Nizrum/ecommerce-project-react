import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { formatMoney } from '../../utils/money';
import {
	deleteCartItem,
	updateCartItemQuantity,
} from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import type { CartItem } from '../../types';

interface CartItemDetailsProps {
	cartItem: CartItem;
}

export function CartItemDetails({ cartItem }: CartItemDetailsProps) {
	const dispatch = useAppDispatch();
	const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
	const [quantity, setQuantity] = useState(cartItem.quantity);

	const updateQuantity = () => {
		if (isUpdatingQuantity === true) {
			dispatch(
				updateCartItemQuantity({ productId: cartItem.productId, quantity }),
			);
		}
		setIsUpdatingQuantity(!isUpdatingQuantity);
	};

	const changeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
		setQuantity(Number(event.target.value));
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			updateQuantity();
		} else if (event.key === 'Escape') {
			setQuantity(cartItem.quantity);
			setIsUpdatingQuantity(false);
		}
	};

	return (
		<>
			<img
				className="product-image"
				src={cartItem.product.image}
			/>

			<div className="cart-item-details">
				<div className="product-name">{cartItem.product.name}</div>
				<div className="product-price">
					{formatMoney(cartItem.product.priceCents)}
				</div>
				<div className="product-quantity">
					<span>
						Quantity:{' '}
						<input
							className={`quantity-input ${isUpdatingQuantity ? 'active' : ''}`}
							type="text"
							value={quantity}
							onChange={changeQuantity}
							onKeyDown={handleKeyPress}
						/>
						<span
							className={`quantity-label ${!isUpdatingQuantity ? 'active' : ''}`}>
							{cartItem.quantity}
						</span>
					</span>
					<span
						className="update-quantity-link link-primary"
						onClick={updateQuantity}>
						Update
					</span>
					<span
						className="delete-quantity-link link-primary"
						onClick={() =>
							dispatch(deleteCartItem({ productId: cartItem.productId }))
						}>
						Delete
					</span>
				</div>
			</div>
		</>
	);
}
