import flow from 'lodash/flow';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import capitalize from 'lodash/capitalize';

export const pascalCase = flow(
  camelCase,
  upperFirst
);

export const classNames = arr => arr.filter(Boolean).join(' ');

export const removeTags = html => html.replace(/(<([^>]+)>)/gi, '');

export const capitalizeWords = string =>
  string
    .split(' ')
    .map(capitalize)
    .join(' ');

export const createMapsUrl = ({ latitude, longitude, googlePlaceId }) => {
  let mapsUrl = `http://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  if (googlePlaceId) {
    mapsUrl += `&query_place_id=${googlePlaceId}`;
  }
  return mapsUrl;
};
