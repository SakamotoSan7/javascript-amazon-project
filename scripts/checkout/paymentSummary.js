import { cart, emptyAllCartItems } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/DeliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';
import { renderCartQuantity } from '../../data/cart.js';

export function renderPaymentSummary() {
	let productPriceCents = 0;
	let shippingPriceCents = 0;

	cart.forEach((cartItem) => {
		const product = getProduct(cartItem.productId);
		productPriceCents += product.priceCents * cartItem.quantity;

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});
	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = totalBeforeTaxCents * 0.1;
	const totalCents = totalBeforeTaxCents + taxCents;

	const paymentSummaryHTML = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
            <div class="js-items-quantity"></div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary js-place-order-button">
            Place your order
        </button>
    `;

	document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

	// Function to show the custom pop-up
	function showCustomPopup() {
		document.getElementById('customPopup').style.display = 'block';
	}

	// Function to hide the custom pop-up
	function hideCustomPopup() {
		document.getElementById('customPopup').style.display = 'none';
	}

	// Event listener for place order button
	document.querySelector('.js-place-order-button').addEventListener('click', async () => {
		try {
			if (cart.length === 0) {
				showCustomPopup(); // Show custom pop-up if cart is empty
				return; // Exit early if cart is empty
			}

			const response = await fetch('https://supersimplebackend.dev/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart: cart,
				}),
			});

			const order = await response.json();

			addOrder(order);
			emptyAllCartItems();

			// Redirect to orders.html after processing
			window.location.href = 'orders.html';
		} catch (error) {
			console.log(error);
		}
	});

	// Event listener for close button in custom pop-up
	document.getElementById('closePopupBtn').addEventListener('click', hideCustomPopup);

	renderCartQuantity();
}
