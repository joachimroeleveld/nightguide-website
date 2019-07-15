import { useMemo } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';
import Modal from 'react-modal';

import { useWindowWidth } from '../lib/hooks';
import colors from '../styles/colors';
import __ from '../lib/i18n';
import { withNavigation } from './Navigation';
import dimensions from '../styles/dimensions';

/*language=CSS*/
const modalStyles = css.resolve`
  .ReactModal__Overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
  }
  .ReactModal__Content {
      height: 100%;
      margin: 0 auto;
      padding: 0 2em;
      max-width: ${dimensions.pageWidth};
      overflow: auto;
      outline: none;
      WebkitOverflowScrolling: touch;
  }
`;

function PrimaryMenu(props) {
  const { open, onClose, routeParams } = props;

  const windowWidth = useWindowWidth();

  const items = useMemo(
    () => [
      { route: 'events', title: __('menu.events') },
      { route: 'articles', title: __('menu.blog') },
      {
        route: 'explore',
        title: __('menu.explore'),
        className: 'explore',
      },
    ],
    []
  );

  if (windowWidth <= 800) {
    return (
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        overlayClassName={modalStyles.className}
        className={modalStyles.className}
      >
        <ul>
          {items.map(({ route, title, className }) => (
            <li key={route} className={className}>
              <Link route={route} routeParams={routeParams}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
        {modalStyles.styles}
        {/*language=CSS*/}
        <style jsx>{`
          ul {
          }
        `}</style>
      </Modal>
    );
  } else {
    return (
      <ul>
        {items.map(({ href, title, className }) => (
          <li key={href} className={className}>
            <Link href={href}>
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
            padding: 0 0.3em;
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

export default withNavigation(PrimaryMenu);
