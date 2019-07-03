const express = require('express');

module.exports = (app, pageSlug) => {
  const router = express.Router({ mergeParams: true });

  const baseParams = req => ({
    ...req.query,
    pageSlug,
  });

  router.get('/', (req, res) => {
    let actualPage;
    if (pageSlug === 'nl/utrecht') {
      actualPage = '/cities/utrecht';
    } else if (pageSlug === 'es/ibiza') {
      actualPage = '/cities/ibiza';
    }
    app.render(req, res, actualPage, baseParams(req));
  });

  router.get('/events', (req, res) => {
    const actualPage = '/events';
    app.render(req, res, actualPage, baseParams(req));
  });

  router.get('/events/:event', (req, res) => {
    const actualPage = '/event';
    const queryParams = {
      event: req.params.event,
      ...baseParams(req),
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/articles', (req, res) => {
    const actualPage = '/articles';
    app.render(req, res, actualPage, baseParams(req));
  });

  router.get('/articles/:article', (req, res) => {
    const actualPage = '/article';
    const queryParams = {
      article: req.params.article,
      ...baseParams(req),
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/explore', (req, res) => {
    const actualPage = '/explore';
    app.render(req, res, actualPage, baseParams(req));
  });

  router.get('/tags/:tag', (req, res) => {
    const actualPage = '/tag';
    const queryParams = {
      ...baseParams(req),
      tag: req.params.tag,
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/venues/:venue', (req, res) => {
    const actualPage = '/venue';
    const queryParams = {
      ...baseParams(req),
      venue: req.params.venue,
    };
    app.render(req, res, actualPage, queryParams);
  });

  return router;
};
