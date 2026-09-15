export interface Product {
	id: string;
	image: string;
	name: string;
	rating: {
		stars: number;
		count: number;
	};
	priceCents: number;
	keywords: string[];
}

export interface CartItem {
	id: string;
	productId: string;
	quantity: number;
	deliveryOptionId: string;
	createdAt: string;
	updatedAt: string;
	product: Product;
}

export interface DeliveryOption {
	id: string;
	deliveryDays: number;
	estimatedDeliveryTime: number;
	priceCents: number;
	createdAt: string;
	updatedAt: string;
}

export interface PaymentSummary {
	productCostCents: number;
	shippingCostCents: number;
	taxCents: number;
	totalCostBeforeTaxCents: number;
	totalCostCents: number;
	totalItems: number;
}

export interface OrderProduct {
	productId: string;
	quantity: number;
	estimatedDeliveryTime: number;
	product?: Product;
}

export interface Order {
	id: string;
	totalCostCents: number;
	orderTimeMs: number;
	products: OrderProduct[];
	createdAt: string;
	updatedAt: string;
}
