import i18n from 'i18n-js';

import en from '../../translations/en.json';

i18n.defaultLocale = 'en-GB';

i18n.fallbacks = true;
i18n.translations = { en };
i18n.missingTranslation = function() {
  return null;
};

function __(...args) {
  return i18n.t(...args);
}

export function __city(pageSlug) {
  return (scope, ...args) => __(`city.${pageSlug}.${scope}`, ...args);
}

export function _o(translatedObject) {
  if (translatedObject[i18n.locale]) {
    return translatedObject[i18n.locale];
  } else if (translatedObject.en) {
    return translatedObject.en;
  }
  return false;
}

export default __;
