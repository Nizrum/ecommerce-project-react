import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState, type ChangeEvent } from 'react';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import WhiteLogo from '../assets/images/logo-white.png';
import WhiteMobileLogo from '../assets/images/mobile-logo-white.png';
import './Header.css';
import { useAppSelector } from '../app/hooks';

export function Header() {
	const navigate = useNavigate();
	const cart = useAppSelector((state) => state.cart.cartItems);
	const [searchParams] = useSearchParams();
	const search = searchParams.get('search');
	const [searchText, setSearchText] = useState(search || '');

	let totalQuantity = cart.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0,
	);

	const handleSearchBarInput = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};

	const handleSearch = () => {
		navigate(`/?search=${searchText}`);
	};

	return (
		<>
			<div className="header">
				<div className="left-section">
					<NavLink
						to="/"
						className="header-link">
						<img
							className="logo"
							src={WhiteLogo}
						/>
						<img
							className="mobile-logo"
							src={WhiteMobileLogo}
						/>
					</NavLink>
				</div>

				<div className="middle-section">
					<input
						className="search-bar"
						type="text"
						placeholder="Search"
						value={searchText}
						onChange={handleSearchBarInput}
					/>

					<button
						className="search-button"
						onClick={handleSearch}>
						<img
							className="search-icon"
							src={SearchIcon}
						/>
					</button>
				</div>

				<div className="right-section">
					<NavLink
						className="orders-link header-link"
						to="/orders">
						<span className="orders-text">Orders</span>
					</NavLink>

					<NavLink
						className="cart-link header-link"
						to="/checkout">
						<img
							className="cart-icon"
							src={CartIcon}
						/>
						<div className="cart-quantity">{totalQuantity}</div>
						<div className="cart-text">Cart</div>
					</NavLink>
				</div>
			</div>
		</>
	);
}
