import { Router } from '../../routes';
import { generateId } from '../util';

export const saveRouteInfo = () => {
  const id = generateId();
  const { route, query } = Router.router;
  const state = {
    route,
    query,
  };
  console.log(state);
  // localStorage.setItem(id, JSON.stringify(state));
  return id;
};

export const getRouteInfo = id => {
  const info = localStorage.getItem(id);
  if (info) {
    return JSON.parse(info);
  }
  return null;
};

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
