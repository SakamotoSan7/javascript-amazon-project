export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
	orders.unshift(order);
	saveToStorage();
}

function saveToStorage() {
	localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrderProduct(orderId, productId) {
	const order = orders.find((order) => order.id === orderId);
	return order && order.products.find((product) => product.productId === productId);
}

export function getOrder(orderId) {
	return orders.find((order) => order.Id === orderId);
}
