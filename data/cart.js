export let cart;

loadFromStorage();

export function loadFromStorage() {
	cart = JSON.parse(localStorage.getItem('cart'));

	if (!cart) {
		cart = [];
	}
}

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function findCartItem(productId) {
	return cart.find((cartItem) => cartItem.productId === productId);
	/* complicated version of the above 
	let matchingItem;
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});
    */
}

export function addToCart(productId, input) {
	const matchingItem = findCartItem(productId);

	if (matchingItem) {
		matchingItem.quantity += input ?? 1;
	} else {
		cart.push({
			productId: productId,
			quantity: input ?? 1,
			deliveryOptionId: '1',
		});
	}

	saveToStorage();
}

export function removeFromCart(productId) {
	cart = cart.filter((cartItem) => cartItem.productId !== productId);

	/* complicated version of the above
    const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;
    */

	saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem = findCartItem(productId);
	matchingItem.deliveryOptionId = deliveryOptionId;

	saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
	let matchingItem = findCartItem(productId);

	if (newQuantity === 0) {
		cart = cart.filter((item) => item !== matchingItem);
	} else {
		matchingItem.quantity = newQuantity;
	}
	saveToStorage();
}

export function cartQuantityTotal() {
	return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

export function renderCartQuantity() {
	document.querySelector('.js-items-quantity').innerHTML = `Items (${cartQuantityTotal()}):`;
}

export function renderItemsQuantity() {
	document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantityTotal()} items`;
}
