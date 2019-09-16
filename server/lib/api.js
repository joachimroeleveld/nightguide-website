const request = require('request-promise');

const HOST = process.env.NG_API_HOST;
const TOKEN = process.env.NG_API_TOKEN;

function _request(path, opts) {
  if (!HOST || !TOKEN) {
    throw new Error('missing_api_credentials');
  }
  return request(HOST + path, {
    headers: {
      Authorization: 'Bearer ' + TOKEN,
    },
    json: true,
  });
}

module.exports = {};
