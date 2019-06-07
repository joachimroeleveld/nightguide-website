const { parsed: localConf } = require('dotenv').config();

const publicRuntimeConfig = Object.keys(localConf)
  .filter(key => key.indexOf('PUBLIC_') === 0)
  .reduce(
    (conf, key) => ({
      ...conf,
      [key]: localConf[key],
    }),
    {}
  );

// next.config.js
module.exports = {
  serverRuntimeConfig: process.env,
  publicRuntimeConfig,
};
