import fetch from 'isomorphic-unfetch';
import qs from 'qs';

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

async function request(path, opts = {}) {
  let { query = {}, offset, limit, fields, method = 'GET' } = opts;
  const querystring = qs.stringify({
    ...query,
    fields,
    limit,
    offset,
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

export async function getEvents(opts) {
  return await request('/events', {
    fields: ['title', 'images', 'facebook', 'dates', 'organiser', 'tags'],
    ...opts,
    query: {
      dateFrom: new Date().toISOString(),
      ...opts.query,
    },
  });
}

export async function getEvent(id, opts) {
  return await request(`/events/${id}`, opts);
}
