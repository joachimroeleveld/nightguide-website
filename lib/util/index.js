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
