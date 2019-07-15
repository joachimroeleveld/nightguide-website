require('dotenv').config();

const Sentry = require('@sentry/node');

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routes = require('../routes');
const handle = routes.getRequestHandler(app);

const { PORT, HOST = undefined } = process.env;

app
  .prepare()
  .then(async () => {
    const server = express();

    server.get('/health', (req, res) => {
      res.json({ status: 'OK' });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, HOST, err => {
      if (err) throw err;
      console.log(`> Ready on http://${HOST}:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
