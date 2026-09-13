import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';
import { CartItemDetails } from './CartItemDetails';
import { useSelector } from 'react-redux';

export function OrderSummary({ deliveryOptions }) {
	const cart = useSelector((state) => state.cart.cartItems);
	return (
		<div className="order-summary">
			{deliveryOptions.length > 0 &&
				cart.map((cartItem) => {
					return (
						<div
							key={cartItem.productId}
							className="cart-item-container">
							<DeliveryDate
								deliveryOptions={deliveryOptions}
								cartItem={cartItem}
							/>

							<div className="cart-item-details-grid">
								<CartItemDetails cartItem={cartItem} />
								<DeliveryOptions
									deliveryOptions={deliveryOptions}
									cartItem={cartItem}
								/>
							</div>
						</div>
					);
				})}
			{cart.length == 0 && (
				<div>Your cart is empty. Add some items to see them here.</div>
			)}
		</div>
	);
}
