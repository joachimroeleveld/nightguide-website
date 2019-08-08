import { useMemo, memo, useEffect } from 'react';
import css from 'styled-jsx/css';
import Modal from 'react-modal';
import Router from 'next/router';

import { Link } from '../routes';
import { useWindowWidth } from '../lib/hooks';
import colors from '../styles/colors';
import __ from '../lib/i18n';
import { withNavigation } from './Navigation';
import dimensions from '../styles/dimensions';

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
  const { open, onClose, pageSlug, routeParams, offsetTop } = props;

  const windowWidth = useWindowWidth();

  const items = useMemo(() => {
    let items = [];
    if (pageSlug === 'nl/utrecht') {
      items = items.concat([
        { route: 'events', title: __('menu.events') },
        { route: 'articles', title: __('menu.blog') },
        {
          route: 'explore',
          title: __('menu.explore'),
          className: 'explore',
        },
      ]);
    }
    if (!pageSlug || windowWidth < 800) {
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

  const modalStyles = useMemo(() => createModalStyles(offsetTop), [offsetTop]);

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
          {!!items.length && (
            <ul>
              {items.map(({ route, title, className }) => (
                <li key={route} className={className}>
                  <Link route={route} params={routeParams}>
                    <a>{title}</a>
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
          ul {
            list-style: none;
            padding: 0.6em 0;
            flex-grow: 1;
          }
          a {
            display: block;
            padding: 0.8em 2em;
          }
          a:focus {
            background: ${colors.focus};
          }
          li:not(:first-of-type),
          footer a {
            border-top: 1px solid ${colors.separator};
          }
          footer {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          footer a {
            background: #171717;
          }
          footer.at-top a:first-child {
            border-top: none;
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
          .explore {
            color: ${colors.textDark};
            background-color: ${colors.primaryButton};
            padding: 0 1em;
            margin-left: 0.7em;
            border-radius: 10px;
          }
          li a {
            padding: 0 0.8em;
            font-size: 0.9em;
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

export default withNavigation(memo(PrimaryMenu));
