const path = require('path');
const fs = require('fs');

// Load .env
require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load .env.$NODE_ENV
let publicEnv = {};
const publicEnvPath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV}`
);
if (fs.existsSync(publicEnvPath)) {
  const { parsed: parsedEnv } = require('dotenv').config({
    path: publicEnvPath,
  });
  publicEnv = parsedEnv;
}

const publicEnvFiltered = Object.keys(publicEnv)
  .filter(key => key.indexOf('REACT_APP_') === 0)
  .reduce(
    (conf, key) => ({
      ...conf,
      [key]: publicEnv[key],
    }),
    {}
  );

module.exports = {
  env: {
    ...publicEnvFiltered,
    NODE_ENV: process.env.NODE_ENV,
  },
};
