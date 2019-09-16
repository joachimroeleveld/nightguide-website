import qs from 'qs';
import { Router } from '../../routes';

export const setUrlParams = params => {
  const search = qs.parse(location.search.substr(1));
  for (const param in params) {
    if (params[param] !== null) {
      search[param] = params[param];
    } else {
      delete search[param];
    }
  }
  const query = qs.stringify(search);
  const href = location.pathname + (query ? `?${query}` : '');
  Router.pushRoute(href, { shallow: true });
};

export const reload = () => {
  Router.replaceRoute(location.pathname + location.search);
};
