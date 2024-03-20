import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCartQuantity, renderItemsQuantity } from '../data/cart.js';

renderOrderSummary();
renderPaymentSummary();
renderCartQuantity();
renderItemsQuantity();
