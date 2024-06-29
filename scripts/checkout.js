import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCartQuantity, renderItemsQuantity, loadCart } from '../data/cart.js';
import { loadProductsFetch } from '../data/products.js';
//import '../data/cart-oop.js';
//import '../data/backend-practice.js'

async function loadPage() {
	try {
		//throw 'error1';
		await loadProductsFetch();

		await new Promise((resolve, reject) => {
			//throw 'error2';

			loadCart(() => {
				//reject('error3');
				resolve();
			});
		});
	} catch (error) {
		console.log('this is the error BRO', error);
	}

	renderOrderSummary();
	renderPaymentSummary();
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
