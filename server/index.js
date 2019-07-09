require('dotenv').config();

const Sentry = require('@sentry/node');

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routes = require('./routes');
const { getCityConfig } = require('./lib/api');

const { PORT, HOST = undefined } = process.env;

const STATIC_ROUTES = ['', 'expert-chat', 'privacy-policy', 'ticket-redirect'];

app
  .prepare()
  .then(async () => {
    const server = express();

    server.get('/health', (req, res) => {
      res.json({ status: 'OK' });
    });

    const cityConfig = await getCityConfig();
    // Create routes for all city pages
    Object.keys(cityConfig).forEach(slug => {
      server.use(`/${slug}`, routes.city(app, slug));
    });

    STATIC_ROUTES.forEach(route => {
      server.get(`/${route}`, (req, res) => {
        app.render(req, res, `/${route}`, req.query);
      });
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
