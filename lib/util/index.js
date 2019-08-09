import flow from 'lodash/flow';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import capitalize from 'lodash/capitalize';

export function generateId() {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

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
