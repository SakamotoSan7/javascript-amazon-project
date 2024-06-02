const cart = {
	cartItems: undefined,

	loadFromStorage() {
		this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

		if (!this.cartItems) {
			this.cartItems = [];
		}
	},

	saveToStorage() {
		localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
	},

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
	},

	addToCart(productId, input) {
		const matchingItem = this.findCartItem(productId);

		if (matchingItem) {
			matchingItem.quantity += input;
		} else {
			this.cartItems.push({
				productId: productId,
				quantity: input,
				deliveryOptionId: '1',
			});
		}

		this.saveToStorage();
	},

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
	},

	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem = this.findCartItem(productId);
		matchingItem.deliveryOptionId = deliveryOptionId;

		this.saveToStorage();
	},

	updateQuantity(productId, newQuantity) {
		let matchingItem = this.findCartItem(productId);

		if (newQuantity === 0) {
			this.cartItems = this.cartItems.filter((item) => item !== matchingItem);
		} else {
			matchingItem.quantity = newQuantity;
		}
		this.saveToStorage();
	},

	cartQuantityTotal() {
		return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
	},

	renderCartQuantity() {
		document.querySelector('.js-items-quantity').innerHTML = `Items (${this.cartQuantityTotal()}):`;
	},

	renderItemsQuantity() {
		document.querySelector('.js-cart-quantity').innerHTML = `${this.cartQuantityTotal()} items`;
	},
};

cart.loadFromStorage();

console.log(cart);
