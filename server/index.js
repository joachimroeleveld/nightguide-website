require('dotenv').config();

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routes = require('./routes');

const { PORT } = process.env;

app
  .prepare()
  .then(() => {
    const server = express();

    Object.keys(routes).forEach(basePath => {
      server.use(`/${basePath}`, routes[basePath](app));
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
