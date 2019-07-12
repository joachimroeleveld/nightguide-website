import fetch from 'isomorphic-unfetch';
import moment from 'moment-timezone';
import qs from 'qs';

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

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
    fields: ['name', 'images', 'description'],
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

export async function getEvents({ query = {}, ...opts }) {
  const { dateFrom, dateTo } = query;
  return await request('/events', {
    fields: [
      'title',
      'images',
      'facebook',
      'date',
      'dateIndex',
      'organiser',
      'tags',
      'tickets',
      'videoUrl',
    ],
    sortBy: 'date.from:asc,_id',
    query: {
      // tagged: process.env.NODE_ENV === 'production' ? true : undefined,
      ...query,
      dateFrom: dateFrom
        ? dateFrom.toISOString()
        : moment()
            .toDate()
            .toISOString(),
      dateTo: dateTo ? dateTo.toISOString() : undefined,
    },
    ...opts,
  });
}

export async function getEvent(id, opts) {
  return await request(`/events/${id}`, opts);
}
