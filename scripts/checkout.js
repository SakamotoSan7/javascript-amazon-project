import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCartQuantity, renderItemsQuantity, loadCart } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
//import '../data/cart-oop.js';
//import '../data/backend-practice.js'

async function loadPage() {
	await loadProductsFetch();

	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});

	renderOrderSummary();
	renderPaymentSummary();
	renderCartQuantity();
	renderItemsQuantity();
}

loadPage();

/*/////////////////////////////////////////////////
Promise.all([
	loadProductsFetch(),

	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	}),
]).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
	renderCartQuantity();
	renderItemsQuantity();
});
*/ ///////////////////////////////////////////////

/*///////////////////////////////////////////////
new Promise((resolve) => {
	loadProducts(() => {
		resolve();
	});
})
	.then(() => {
		return new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		});
	})
	.then(() => {
		renderOrderSummary();
		renderPaymentSummary();
		renderCartQuantity();
		renderItemsQuantity();
	});
*/ /////////////////////////////////////////////////

/*//////////////////////////////////////////////////
loadProducts(() => {
	loadCart(() => {
		renderOrderSummary();
		renderPaymentSummary();
		renderCartQuantity();
		renderItemsQuantity();
	});
});
*/ /////////////////////////////////////////////////
