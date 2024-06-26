class Cart {
	cartItems;
	#localStorageKey;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	#loadFromStorage() {
		this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
	}

	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}

	findCartItem(productId) {
		return this.cartItems.find((cartItem) => cartItem.productId === productId);
		/* complicated version of the above 
		let matchingItem;
		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				matchingItem = cartItem;
			}
		});
		*/
	}

	addToCart(productId, input) {
		const matchingItem = this.findCartItem(productId);

		if (matchingItem) {
			matchingItem.quantity += input ?? 1;
		} else {
			this.cartItems.push({
				productId: productId,
				quantity: input ?? 1,
				deliveryOptionId: '1',
			});
		}

		this.saveToStorage();
	}

	removeFromCart(productId) {
		this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);

		/* complicated version of the above
		const newCart = [];
	
		this.cartItems.forEach((cartItem) => {
			if (cartItem.productId !== productId) {
				newCart.push(cartItem);
			}
		});
	
		this.cartItems = newCart;
		*/

		this.saveToStorage();
	}

	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem = this.findCartItem(productId);
		matchingItem.deliveryOptionId = deliveryOptionId;

		this.saveToStorage();
	}

	updateQuantity(productId, newQuantity) {
		let matchingItem = this.findCartItem(productId);

		if (newQuantity === 0) {
			this.cartItems = this.cartItems.filter((item) => item !== matchingItem);
		} else {
			matchingItem.quantity = newQuantity;
		}
		this.saveToStorage();
	}

	cartQuantityTotal() {
		return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
	}

	renderCartQuantity() {
		document.querySelector('.js-items-quantity').innerHTML = `Items (${this.cartQuantityTotal()}):`;
	}

	renderItemsQuantity() {
		document.querySelector('.js-cart-quantity').innerHTML = `${this.cartQuantityTotal()} items`;
	}
}
const cart1 = new Cart('cart-class');

console.log(cart1);
