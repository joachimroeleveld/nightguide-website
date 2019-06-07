import flow from 'lodash/flow';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

export const pascalCase = flow(
  camelCase,
  upperFirst
);
