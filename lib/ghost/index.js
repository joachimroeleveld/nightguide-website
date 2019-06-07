import fetch from 'isomorphic-unfetch';
import qs from 'qs';

const URL = process.env.BLOG_URL;
const API_KEY = process.env.BLOG_API_KEY;

async function request(path, opts = {}) {
  const { query = {}, method = 'GET' } = opts;
  const querystring = qs.stringify({
    key: API_KEY,
    ...query,
  });
  let url = `${URL}${path}`;
  if (querystring) {
    url += '?' + querystring;
  }
  const response = await fetch(url, {
    method,
  });
  if (!response.ok) {
    throw new Error(`Unexpected HTTP status: ${response.statusCode}`);
  }
  return await response.json();
}

export async function getGhostPageById(id, opts) {
  const path = `/pages/${id}/`;
  const response = await request(path, opts);
  return response.pages.pop();
}

export async function getGhostPostBySlug(slug, opts) {
  const path = `/posts/slug/${slug}/`;
  const response = await request(path, opts);
  return response.posts.pop();
}

export async function getPosts(opts) {
  const path = `/posts/`;
  const response = await request(path, opts);
  return response.posts;
}

export async function getPostsFiltered(filter, opts = {}) {
  const { limit, page } = opts;
  return await getPosts({
    query: {
      filter,
      limit,
      page,
      ...opts.query,
    },
    opts,
  });
}
