export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
	cart = [
		{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptionId: '1',
		},
		{
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
			deliveryOptionId: '2',
		},
	];
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
		matchingItem.quantity += input;
	} else {
		cart.push({
			productId: productId,
			quantity: input,
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

export function cartQuantityTotal () {
	return cart.reduce((total, cartItem) => total + cartItem.quantity, 0)
} 

export function renderCartQuantity (){
    document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantityTotal()} items`;
	document.querySelector('.js-items-quantity').innerHTML = `Items (${cartQuantityTotal()}):`
}