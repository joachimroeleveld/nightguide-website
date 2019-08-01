import { Router } from '../../routes';

export const setUrlParams = params => {
  const url = new URL(window.location);
  const search = new URLSearchParams(url.search);
  for (const param in params) {
    if (params[param] !== null) {
      search.set(param, params[param]);
    } else {
      search.delete(param);
    }
  }
  const qs = search.toString();
  const href = url.pathname + (qs ? `?${qs}` : '');
  Router.pushRoute(href, { shallow: true });
};

export const reload = () => {
  Router.replaceRoute(location.pathname + location.search);
};
