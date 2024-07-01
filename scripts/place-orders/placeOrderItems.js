import { getProduct, loadProductsFetch } from '../../data/products.js';

export async function placeOrderItems(order) {
	try {
		await loadProductsFetch();

		let placeOrderHTML = '';

		for (const product of order.products) {
			try {
				const matchingProduct = getProduct(product.productId);

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
						<button class="buy-again-button button-primary js-buy-again-button"
						data-product-id="${product.productId}" data-quantity="${product.quantity}">
							<img class="buy-again-icon" src="images/icons/buy-again.png" />
							<span class="buy-again-message">Buy it again</span>
						</button>
					</div>

					<div class="product-actions">
						<a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
							<button class="track-package-button button-secondary">Track package</button>
						</a>
					</div>
				`;
			} catch (error) {
				const matchingProduct = await getProduct(product.productId);

				console.error(`Error processing product with ID: ${product.productId}`, error);
				placeOrderHTML += `
					<div></div>
					<div class="error-message">
						Failed to load product details for product ID: ${matchingProduct.name}.
					</div>
				`;
			}
		}

		return placeOrderHTML;
	} catch (error) {
		console.error('Failed to load products', error);
		return `<div class="error-message">There was an error loading the order items. Please try again later.</div>`;
	}
}
