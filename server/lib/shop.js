const find = require('lodash/find');

const { PRODUCTS } = require('../constants');

function getUserAddedItems(items) {
  return items.filter(
    item => !find(Object.values(PRODUCTS), { sku: item.sku })
  );
}

function populateItemPrices(event, items) {
  const products = Object.values(PRODUCTS).concat(
    event.tickets.products.map(product => ({
      ...product,
      sku: product.id,
    }))
  );
  return items.map(item => ({
    ...item,
    price: find(products, { sku: item.sku }).price,
  }));
}

function calculatePaymentAmount(items) {
  const userAddedItems = getUserAddedItems(items);
  const total = userAddedItems.reduce((total, { quantity, price }) => {
    return total + price * quantity;
  }, 0);
  const fees = PRODUCTS.bookingFee.price * userAddedItems.length;
  return total + fees;
}

module.exports = {
  populateItemPrices,
  getUserAddedItems,
  calculatePaymentAmount,
};
