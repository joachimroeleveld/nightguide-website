import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import __ from '../lib/i18n';
import HorizontalMenu from './HorizontalMenu';
import colors from '../styles/colors';

CityMenu.propTypes = {
  pageSlug: PropTypes.string.isRequired,
  routeParams: PropTypes.object.isRequired,
};

function CityMenu(props) {
  const { routeParams, pageSlug, router } = props;

  const menuItems = [
    {
      route: `/${pageSlug}`,
      label: __('menu.discover'),
      active: router.asPath.match(new RegExp(`^/${pageSlug}/?$`)),
    },
    {
      route: 'events',
      label: __('menu.events'),
      active: router.route === '/EventsPage',
    },
  ];

  if (pageSlug === 'nl/amsterdam') {
    menuItems.push({
      route: 'articles',
      label: __('menu.articles'),
      active: router.route === '/ArticlesPage',
    });
  }

  return (
    <div className="container">
      <HorizontalMenu items={menuItems} routeParams={routeParams} />
      <div className="separator" />
      {/*language=CSS*/}
      <style jsx>{`
        .separator {
          position: absolute;
          left: calc(100vw - 100%);
          width: 100vw;
          height: 1px;
          background: ${colors.separator};
        }
      `}</style>
    </div>
  );
}

export default withRouter(CityMenu);
