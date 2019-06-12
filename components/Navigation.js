import React, { useContext } from 'react';

const NavigationContext = React.createContext({});

export const NavigationProvider = NavigationContext.Provider;

export function withNavigation(Component) {
  function NavigationComponent(props) {
    const { query } = useContext(NavigationContext);

    const { citySlug, countrySlug, city } = query;

    const navProps = {
      baseUrl: '',
      breadcrumbs: [],
    };

    if (citySlug && countrySlug && city) {
      navProps.baseUrl = `/${countrySlug}/${citySlug}`;
      navProps.breadcrumbs.push({
        label: city,
        url: `${countrySlug}/${citySlug}`,
      });
    }

    return <Component {...props} {...navProps} />;
  }

  NavigationComponent.getInitialProps = Component.getInitialProps;

  return NavigationComponent;
}
