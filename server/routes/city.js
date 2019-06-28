const express = require('express');

module.exports = (app, pageSlug) => {
  const router = express.Router({ mergeParams: true });

  const baseParams = {
    pageSlug,
  };

  router.get('/', (req, res) => {
    const actualPage = '/city';
    app.render(req, res, actualPage, baseParams);
  });

  router.get('/events', (req, res) => {
    const actualPage = '/events';
    app.render(req, res, actualPage, baseParams);
  });

  router.get('/events/:event', (req, res) => {
    const actualPage = '/event';
    const queryParams = {
      event: req.params.event,
      ...baseParams,
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/articles', (req, res) => {
    const actualPage = '/articles';
    app.render(req, res, actualPage, baseParams);
  });

  router.get('/articles/:article', (req, res) => {
    const actualPage = '/article';
    const queryParams = {
      article: req.params.article,
      ...baseParams,
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/explore', (req, res) => {
    const actualPage = '/explore';
    app.render(req, res, actualPage, baseParams);
  });

  router.get('/tags/:tag', (req, res) => {
    const actualPage = '/tag';
    const queryParams = {
      ...baseParams,
      tag: req.params.tag,
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/venues/:venue', (req, res) => {
    const actualPage = '/venue';
    const queryParams = {
      ...baseParams,
      venue: req.params.venue,
    };
    app.render(req, res, actualPage, queryParams);
  });

  return router;
};
