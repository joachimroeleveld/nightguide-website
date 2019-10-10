const _ = require('lodash');
const nextRoutes = require('next-routes');

const routes = (module.exports = nextRoutes());

// Static routes
addRoute('home', '/');
addRoute('privacy-policy');
addRoute('affiliate');
addRoute('ticket-redirect');
addRoute('company');
addRoute('help-center');

// Cities
addRoute('/es/ibiza', 'DiscoverPage');
addRoute('/nl/utrecht', 'DiscoverPage');
addRoute('/nl/amsterdam', 'DiscoverPage');

// Dynamic routes
addRoute('events', '/:country/:city/events');
addRoute('articles', '/:country/:city/articles');

addRoute('event', '/:country/:city/events/:event');
addRoute('venue', '/:country/:city/venues/:venue');
addRoute('article', '/:country/:city/articles/:article');

function addRoute(...args) {
  const pascalCase = _.flow(
    _.camelCase,
    _.upperFirst
  );
  const getRoutePageFileName = route => `${pascalCase(route)}Page`;

  if (args.length === 3) {
    routes.add(args[0], args[1], getRoutePageFileName(args[2]));
  } else if (args.length === 2) {
    if (args[0].slice(1) === '/') {
      routes.add(args[0], args[1]);
    } else {
      routes.add(args[0], args[1], getRoutePageFileName(args[0]));
    }
  } else {
    routes.add(args[0], `/${args[0]}`, getRoutePageFileName(args[0]));
  }
}
