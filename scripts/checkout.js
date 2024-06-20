import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCartQuantity, renderItemsQuantity } from '../data/cart.js';
//import '../data/cart-oop.js';
import '../data/backend-practice.js'

renderOrderSummary();
renderPaymentSummary();
renderCartQuantity();
renderItemsQuantity();
