import React, { useMemo } from 'react';
import { withRouter } from 'next/router';

import __ from '../lib/i18n';

export const withNavigation = Component => {
  function extendQuery(baseQuery, route, path) {
    const query = { ...baseQuery };
    const { city, country, dateFrom, dateTo } = query;

    // If city sub-page
    if (city && country) {
      query.pageSlug = `${country}/${city}`;
    }
    // If city page
    else if (route.match(/^\/cities\/[^/]+$/)) {
      const [match, pageSlug, country, city] = path.match(/^\/((\w+)\/(\w+))/);
      Object.assign(query, {
        pageSlug,
        country,
        city,
      });
    }

    if (dateFrom) {
      query.dateFrom = new Date(dateFrom);
    }
    if (dateTo) {
      query.dateTo = new Date(dateTo);
    }

    return query;
  }

  function NavigationComponent(props) {
    const { router, ...otherProps } = props;
    let { route, asPath } = router;

    const query = useMemo(() => extendQuery(router.query, route, asPath), [
      router.query,
    ]);

    const path = asPath.split('?')[0];
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
        route: `/${pageSlug}`,
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
