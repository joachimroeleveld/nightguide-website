import React, { useContext } from 'react';
import { withRouter } from 'next/router';
import trim from 'lodash/trim';

import __ from '../lib/i18n';

const QueryContext = React.createContext({});

export const QueryProvider = QueryContext.Provider;

export const withNavigation = Component => {
  function extendQuery(baseQuery, route, path) {
    const query = { ...baseQuery };
    const { city, country } = query;

    // If city sub-page
    if (city && country) {
      query.pageSlug = `${country}/${city}`;
    }
    // If city page
    else if (route.match(/^\/cities\/[^/]+$/)) {
      query.pageSlug = trim(path.slice(1), '/');
      query.country = path.split('/')[1];
      query.city = path.split('/')[2];
    }

    return query;
  }

  function NavigationComponent(props) {
    const { router, ...otherProps } = props;
    let { ...query } = useContext(QueryContext);

    query = extendQuery(query, router.route, router.asPath);

    const path = router.asPath.split('?')[0];
    const currentUrl = `${process.env.REACT_APP_HOST}${path}`;

    const { pageSlug, city, country } = query;

    const navProps = {
      pageSlug,
      breadcrumbs: [],
      currentUrl,
      query,
    };

    if (pageSlug) {
      navProps.routeParams = { city, country };
      navProps.breadcrumbs.push({
        label: __(`city.${pageSlug}.name`),
        url: pageSlug,
      });
    }

    return <Component {...otherProps} {...navProps} />;
  }

  if (Component.getInitialProps) {
    NavigationComponent.getInitialProps = async function(ctx) {
      const query = extendQuery(ctx.query, ctx.pathname, ctx.asPath);
      return await Component.getInitialProps({
        ...ctx,
        query,
      });
    };
  }

  return withRouter(NavigationComponent);
};
