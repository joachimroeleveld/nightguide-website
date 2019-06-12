import React, { useContext } from 'react';

const NavigationContext = React.createContext({});

export const NavigationProvider = NavigationContext.Provider;

export function withNavigation(Component) {
  function NavigationComponent(props) {
    const { query, pathName } = useContext(NavigationContext);

    const { citySlug, countrySlug } = query;

    const navProps = {
      baseUrl: '',
    };

    if (citySlug && countrySlug) {
      navProps.baseUrl = `/${countrySlug}/${citySlug}`;
    }

    return <Component {...props} {...navProps} />;
  }

  NavigationComponent.getInitialProps = Component.getInitialProps;

  return NavigationComponent;
}
