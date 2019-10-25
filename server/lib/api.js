const request = require('request-promise');

const HOST = process.env.NG_API_HOST;
const TOKEN = process.env.NG_API_TOKEN;

function _request(path, opts = {}) {
  if (!HOST || !TOKEN) {
    throw new Error('missing_api_credentials');
  }

  return request(HOST + path, {
    headers: {
      Authorization: 'Bearer ' + TOKEN,
      ...opts.headers,
    },
    json: true,
    ...opts,
  });
}

async function getEvent(id, opts) {
  return await _request(`/events/${id}`, opts);
}

async function createOrder(order, opts) {
  return await _request(`/orders`, {
    method: 'POST',
    body: order,
    ...opts,
  });
}

async function updateOrder(orderId, order, opts) {
  return await _request(`/orders/${orderId}`, {
    method: 'PUT',
    body: order,
    ...opts,
  });
}

async function updateOrderMeta(orderId, key, value, opts) {
  return await _request(`/orders/${orderId}/metadata/${key}`, {
    method: 'PUT',
    body: {
      value,
    },
    ...opts,
  });
}

module.exports = {
  getEvent,
  createOrder,
  updateOrder,
  updateOrderMeta,
};
