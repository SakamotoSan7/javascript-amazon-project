export const cart = [];

export function addToCart(productId){
    let matchingcartItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingcartItem = cartItem
        };
    });

    if (matchingcartItem) {
        matchingcartItem.quantity += 1;
    } else {
        cart.push({
            name : productId,
            quantity : 1
        });
    };
};
