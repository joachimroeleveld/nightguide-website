const path = require('path');
const fs = require('fs');

// Load .env
require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load .env.$NODE_ENV
let defaultEnv = {};
const defaultEnvPath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV}`
);
if (fs.existsSync(defaultEnvPath)) {
  const { parsed: parsedEnv } = require('dotenv').config({
    path: defaultEnvPath,
  });
  defaultEnv = parsedEnv;
}

const reactAppEnv = Object.keys(defaultEnv)
  .concat(Object.keys(process.env))
  .filter(key => key.indexOf('REACT_APP_') === 0)
  .reduce(
    (conf, key) => ({
      ...conf,
      [key]: process.env[key] || defaultEnv[key],
    }),
    {}
  );

module.exports = {
  useFileSystemPublicRoutes: false,
  env: {
    ...reactAppEnv,
  },
};
