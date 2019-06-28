import React, { useContext } from 'react';

import __ from '../lib/i18n';

const NavigationContext = React.createContext({});

export const NavigationProvider = NavigationContext.Provider;

export function withNavigation(Component) {
  function NavigationComponent(props) {
    const { query } = useContext(NavigationContext);

    const { pageSlug } = query;

    const navProps = {
      baseUrl: '',
      breadcrumbs: [],
    };

    if (pageSlug) {
      navProps.baseUrl = `/${pageSlug}`;
      navProps.breadcrumbs.push({
        label: __(`city.${pageSlug}.name`),
        url: pageSlug,
      });
    }

    return <Component {...props} {...navProps} />;
  }

  NavigationComponent.getInitialProps = Component.getInitialProps;

  return NavigationComponent;
}
