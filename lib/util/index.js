import flow from 'lodash/flow';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

export const pascalCase = flow(
  camelCase,
  upperFirst
);

export const classNames = arr => arr.filter(Boolean).join(' ');

export const removeTags = html => html.replace(/(<([^>]+)>)/gi, '');
