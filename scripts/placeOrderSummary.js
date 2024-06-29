import { orders } from '../../data/orders.js';
import { placeOrderItems } from './place-orders/placeOrderItems.js';
import { formatCurrency } from './utils/money.js';
import { cartQuantityTotal } from '../data/cart.js';

console.log(orders);

async function renderPlaceOrder() {
	try {
		let placeOrderHTML = '';

		for (const order of orders) {
			try {
				const date = new Date(order.orderTime);
				const options = { year: 'numeric', month: 'long', day: 'numeric' };
				const formattedDate = date.toLocaleDateString('id-ID', options);

				// Wait for placeOrderItems promise to resolve
				const orderItemsHTML = await placeOrderItems(order.products);

				placeOrderHTML += `
		            <div class="order-container">
		                <div class="order-header">
		                    <div class="order-header-left-section">
		                        <div class="order-date">
		                            <div class="order-header-label">Order Placed:</div>
		                            <div>${formattedDate}</div>
		                        </div>
		                        <div class="order-total">
		                            <div class="order-header-label">Total:</div>
		                            <div>$${formatCurrency(order.totalCostCents)}</div>
		                        </div>
		                    </div>

		                    <div class="order-header-right-section">
		                        <div class="order-header-label">Order ID:</div>
		                        <div>${order.id}</div>
		                    </div>
		                </div>

		                <div class="order-details-grid">
		                    ${orderItemsHTML}
		                </div>
		            </div>
		        `;
			} catch (error) {
				console.error(`Failed to process order with ID: ${order.id}`, error);
				placeOrderHTML += `<div class="error-message">There was an error loading the order with ID: ${order.id}. Please try again later.</div>`;
			}
		}

		document.querySelector('.js-orders-grid').innerHTML = placeOrderHTML;

		document.querySelector('.js-cart-quantity').innerHTML = cartQuantityTotal();
	} catch (error) {
		console.error('Failed to render place orders', error);
		document.querySelector('.js-orders-grid').innerHTML = `<div class="error-message">There was an error loading the orders. Please try again later.</div>`;
	}
}

renderPlaceOrder();
