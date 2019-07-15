const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

// Static routes
routes.add('home', '/');
routes.add('expert-chat');
routes.add('privacy-policy');
routes.add('ticket-redirect');

// Cities
routes.add('/es/ibiza', 'cities/ibiza');
routes.add('/nl/utrecht', 'cities/utrecht');

// Dynamic routes
routes.add('events', '/:country/:city/events');
routes.add('event', '/:country/:city/events/:event');
routes.add('articles', '/:country/:city/articles');
routes.add('article', '/:country/:city/articles/:article');
routes.add('explore', '/:country/:city/explore');
routes.add('tag', '/:country/:city/tags/:tag');
routes.add('venue', '/:country/:city/venues/:venue');
