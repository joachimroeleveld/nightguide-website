const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

// Static routes
routes.add('home', '/');
routes.add('privacy-policy');
routes.add('affiliate');
routes.add('ticket-redirect');
routes.add('company');

// Cities
routes.add('/es/ibiza', 'city');
routes.add('/nl/utrecht', 'city');
routes.add('/nl/amsterdam', 'city');

// Dynamic routes
routes.add('events', '/:country/:city/events');
routes.add('articles', '/:country/:city/articles');

routes.add('event', '/:country/:city/events/:event');
routes.add('venue', '/:country/:city/venues/:venue');
routes.add('article', '/:country/:city/articles/:article');
