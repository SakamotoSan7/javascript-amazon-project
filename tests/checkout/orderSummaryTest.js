import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProductsFetch } from '../../data/products.js';

/* eslint-disable */

describe('test suite: renderOrderSummary', () => {
	const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

	beforeAll((done) => {
		loadProductsFetch().then(() => {
			done();
		});
	});

	afterEach(() => {
		document.querySelector('.js-test-container').innerHTML = '';
	});

	beforeEach(() => {
		spyOn(localStorage, 'setItem');

		document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
			<div class="js-payment-summary"></div>
			<div class="js-cart-quantity"></div>
			<button id="closePopupBtn">Close</button>
        `;

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: product1,
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		loadFromStorage();
		renderOrderSummary();
	});

	it('display the cart', () => {
		expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
		expect(document.querySelector(`.js-product-quantity-${product1}`).innerText).toContain('Quantity: 1');
	});

	it('delete the cart', () => {
		document.querySelector(`.js-delete-link-${product1}`).click();

		expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0);
		expect(document.querySelector(`js-cart-item-container-${product1}`)).toEqual(null);
		expect(cart.length).toEqual(0);
	});
});

/* eslint-enable */
