const express = require('express');

module.exports = app => {
  const router = express.Router({ mergeParams: true });

  // TODO: Remove hardcoded map
  const CITY_SLUG_MAP = {
    utrecht: 'Utrecht',
  };

  const getCityQueryParams = req => {
    const { country, city } = req.params;
    return {
      countrySlug: country,
      citySlug: city,
      country: country.toUpperCase(),
      city: CITY_SLUG_MAP[city],
    };
  };

  router.get('/', (req, res) => {
    const actualPage = '/city';
    const queryParams = getCityQueryParams(req);
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/events', (req, res) => {
    const actualPage = '/events';
    const queryParams = getCityQueryParams(req);
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/events/:event', (req, res) => {
    const actualPage = '/event';
    const queryParams = {
      event: req.params.event,
      ...getCityQueryParams(req),
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/articles', (req, res) => {
    const actualPage = '/articles';
    const queryParams = getCityQueryParams(req);
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/articles/:article', (req, res) => {
    const actualPage = '/article';
    const queryParams = {
      article: req.params.article,
      ...getCityQueryParams(req),
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/explore', (req, res) => {
    const actualPage = '/explore';
    const queryParams = {
      ...getCityQueryParams(req),
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/tags/:tag', (req, res) => {
    const actualPage = '/tag';
    const queryParams = {
      ...getCityQueryParams(req),
      tag: req.params.tag,
    };
    app.render(req, res, actualPage, queryParams);
  });

  router.get('/venues/:venue', (req, res) => {
    const actualPage = '/venue';
    const queryParams = {
      ...getCityQueryParams(req),
      venue: req.params.venue,
    };
    app.render(req, res, actualPage, queryParams);
  });

  return router;
};
