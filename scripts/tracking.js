import { getOrderProduct } from '../data/orders.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { cartQuantityTotal } from '../data/cart.js';

async function renderTrackingInfo() {
	await loadProductsFetch();

	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');
	const orderProduct = await getOrderProduct(orderId, productId);
	const matchingProduct = getProduct(orderProduct.productId);

	const date = new Date(orderProduct.estimatedDeliveryTime);
	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	const formattedDate = date.toLocaleDateString('id-ID', options);

	const trackingInfoHTML = `
        <div class="delivery-date">Tiba pada hari ${formattedDate}</div>

        <div class="product-info">${matchingProduct.name}</div>

        <div class="product-info">Quantity: ${orderProduct.quantity}</div>

        <img class="product-image" src="${matchingProduct.image}" />
    `;

	document.querySelector('.js-tracking-info-container').innerHTML = trackingInfoHTML;

	document.querySelector('.js-cart-quantity').textContent = cartQuantityTotal();
}

renderTrackingInfo();
