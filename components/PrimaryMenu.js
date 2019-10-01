import { useMemo, useEffect } from 'react';
import css from 'styled-jsx/css';
import Modal from 'react-modal';
import Router from 'next/router';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { Link } from '../routes';
import { useWindowWidth } from '../lib/hooks';
import colors from '../styles/colors';
import __, { __city } from '../lib/i18n';
import { withNavigation } from './Navigation';
import dimensions from '../styles/dimensions';
import Select from './Select';
import { getPageSlugs } from '../state/cities';
import { getDateFilterById } from './events/util';

/*language=CSS*/
const createModalStyles = offsetTop => css.resolve`
  .ReactModal__Overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-top: ${offsetTop}px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 300ms;
  }
  .ReactModal__Content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: ${dimensions.pageWidth};
    overflow: auto;
    outline: none;
    WebkitOverflowScrolling: touch;
    background: ${colors.bg};
  }
  .ReactModal__Overlay--after-open{
      opacity: 1;
  }
  .ReactModal__Overlay--before-close{
      opacity: 0;
  }
`;

function PrimaryMenu(props) {
  const { open, onClose, pageSlug, routeParams, offsetTop, pageSlugs } = props;

  const windowWidth = useWindowWidth();

  const items = useMemo(() => {
    let items = [];
    if (pageSlug && windowWidth <= 800) {
      items.push(
        ...[
          {
            route: `/${pageSlug}`,
            title: __('menu.discoverCity', { city: __city(pageSlug)('name') }),
          },
          {
            route: `events`,
            title: __('menu.events'),
          },
          {
            route: `articles`,
            title: __('menu.articles'),
          },
        ]
      );
    }
    if (!pageSlug) {
      items.push({ route: 'home', title: __('menu.home') });
    }
    return items;
  }, [pageSlug, windowWidth]);

  useEffect(() => {
    if (open) {
      Router.events.on('routeChangeStart', onClose);
      return () => Router.events.off('routeChangeStart', onClose);
    }
  }, [open, onClose]);

  const onCitySelect = ({ value: pageSlug }) =>
    Router.pushRoute(`/${pageSlug}`);

  const modalStyles = useMemo(() => createModalStyles(offsetTop), [offsetTop]);

  const cityOptions = pageSlugs.map(pageSlug => ({
    value: pageSlug,
    label: __city(pageSlug)('name'),
  }));

  if (windowWidth <= 800) {
    return (
      <Modal
        closeTimeoutMS={300}
        isOpen={open}
        onRequestClose={onClose}
        overlayClassName={modalStyles.className}
        className={modalStyles.className}
      >
        <div className={'content'}>
          <div className="cities">
            <Select
              options={cityOptions}
              onSelect={onCitySelect}
              value={find(cityOptions, { value: pageSlug })}
              placeholder={__('PrimaryMenu.goToCity')}
            />
          </div>
          {!!items.length && (
            <ul className="menu">
              {items.map(({ route, title, className }) => (
                <li key={route} className={className}>
                  <Link route={route} params={routeParams}>
                    <a>
                      {title}
                      {route === 'events' && (
                        <ul className="submenu">
                          {['today', 'tomorrow', 'thisWeekend'].map(
                            (dateFilterId, index) => {
                              const dateFilter = getDateFilterById(
                                dateFilterId
                              );
                              return (
                                <li key={index}>
                                  {index !== 0 && '·'}
                                  <Link
                                    route="events"
                                    params={{
                                      ...routeParams,
                                      dateFrom: dateFilter[0].toISOString(),
                                      dateTo: dateFilter[1].toISOString(),
                                      dateFilterId,
                                    }}
                                  >
                                    <a>{__(`dates.${dateFilterId}`)}</a>
                                  </Link>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      )}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {modalStyles.styles}
        {/*language=CSS*/}
        <style jsx>{`
          .content {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .menu {
            list-style: none;
            padding: 0.6em 0;
            flex-grow: 1;
          }
          .menu > li > a {
            display: block;
            padding: 1em ${dimensions.bodyPadding};
          }
          .menu > li > a:focus {
            background: ${colors.focus};
          }
          .menu > li:not(:first-of-type)::before {
            position: absolute;
            background: ${colors.separator};
            content: '';
            width: calc(100% - ${dimensions.bodyPadding} * 2);
            margin-left: ${dimensions.bodyPadding};
            height: 1px;
          }
          .submenu {
            display: flex;
            margin: 0.5em -0.7em 0;
            color: ${colors.textSecondary};
          }
          .submenu a {
            display: inline-block;
            margin: 0 0.7em;
          }
          .cities {
            margin: 1.5em ${dimensions.bodyPadding} 0.5em;
          }
        `}</style>
      </Modal>
    );
  } else {
    return (
      <ul>
        {items.map(({ route, title, className }) => (
          <li key={route} className={className}>
            <Link route={route} params={routeParams}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
        {/*language=CSS*/}
        <style jsx>{`
          ul {
            list-style: none;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          li > a {
            padding: 0 0.8em;
            font-size: 0.9em;
          }
          .submenu a {
          }
          li a:active,
          li a:hover {
            text-decoration: underline;
          }
        `}</style>
      </ul>
    );
  }
}

export default connect(state => ({
  pageSlugs: getPageSlugs(state),
}))(withNavigation(PrimaryMenu));
