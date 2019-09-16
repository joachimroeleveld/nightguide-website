import fetch from 'isomorphic-unfetch';
import moment from 'moment-timezone';
import qs from 'qs';
import { SORT_DATE, serializeFilter } from '../../components/events/util';

const URL = process.env.REACT_APP_NG_API_HOST;
const API_KEY = process.env.REACT_APP_NG_API_KEY;
const TOKEN = process.env.REACT_APP_NG_API_TOKEN;

async function request(path, opts = {}) {
  let { query = {}, sortBy, offset, limit, fields, method = 'GET' } = opts;
  const querystring = qs.stringify({
    ...query,
    fields,
    limit,
    offset,
    sortBy,
  });
  let url = `${URL}${path}`;
  if (querystring) {
    url += '?' + querystring;
  }
  const headers = {
    ...(opts.headers || {}),
    'x-api-key': API_KEY,
    Authorization: `Bearer ${TOKEN}`,
  };
  const response = await fetch(url, {
    method,
    headers,
  });
  if (!response.ok) {
    throw new Error(`Unexpected HTTP status: ${response.status}`);
  }
  return await response.json();
}

export async function getVenues(opts) {
  return await request('/venues', {
    fields: ['name', 'images', 'location'],
    ...opts,
  });
}

export async function getTags(opts) {
  return await request('/tags', opts);
}

export async function getTagBySlug(slug, opts) {
  return await request(`/tags/slug/${slug}`, opts);
}

export async function getVenue(id, opts) {
  return await request(`/venues/${id}`, opts);
}

export async function getArtist(id, opts) {
  return await request(`/artists/${id}`, opts);
}

export async function getArtists(opts) {
  return await request(`/artists`, opts);
}

export async function getEvents({ query = {}, ...opts }) {
  const { dateFrom } = query;
  const { serialize = true } = opts;
  const filter = {
    ...query,
    dateFrom: dateFrom ? dateFrom : moment().toDate(),
  };
  return await request('/events', {
    fields: [
      'title',
      'images',
      'facebook',
      'date',
      'dateIndex',
      'organiser',
      'tickets',
    ],
    ...opts,
    sortBy: opts.sortBy || SORT_DATE,
    query: serialize ? serializeFilter(filter) : filter,
  });
}

export async function getEvent(id, opts) {
  return await request(`/events/${id}`, opts);
}

export async function getConfigByName(name, pageSlug, opts = {}) {
  opts.query = { ...opts.query, pageSlug };
  return await request(`/configs/name/${name}`, opts);
}
