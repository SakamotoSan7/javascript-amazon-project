import { getProduct, loadProductsFetch } from '../../data/products.js';

export async function placeOrderItems(products) {
	await loadProductsFetch();

	let placeOrderHTML = '';

	for (const product of products) {
		const matchingProduct = await getProduct(product.productId);

		const date = new Date(product.estimatedDeliveryTime);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const formattedDate = date.toLocaleDateString('id-ID', options);

		placeOrderHTML += `
			<div class="product-image-container">
				<img src="${matchingProduct.image}" />
			</div>

			<div class="product-details">
				<div class="product-name">${matchingProduct.name}</div>
				<div class="product-delivery-date">Arriving on: ${formattedDate}</div>
				<div class="product-quantity">Quantity: ${product.quantity}</div>
				<button class="buy-again-button button-primary">
					<img class="buy-again-icon" src="images/icons/buy-again.png" />
					<span class="buy-again-message">Buy it again</span>
				</button>
			</div>

			<div class="product-actions">
				<a href="tracking.html">
					<button class="track-package-button button-secondary">Track package</button>
				</a>
			</div>
		`;
	}

	return placeOrderHTML;
}
