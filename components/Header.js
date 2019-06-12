import { useEffect, useState } from 'react';
import Link from 'next/link';
import throttle from 'lodash/throttle';

import { withNavigation } from './Navigation';
import __ from '../lib/i18n';
import colors from '../styles/colors';

function Header(props) {
  const { baseUrl } = props;

  const [sticky, setSticky] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    const onScroll = throttle(() => {
      setSticky(window.scrollY > 0);
    }, 100);

    window.addEventListener('scroll', onScroll);

    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const innerRef = ref => {
    if (ref && containerHeight === null) {
      setContainerHeight(ref.getBoundingClientRect().height);
    }
  };

  return (
    <header
      className={[sticky ? 'sticky' : '', 'container'].join(' ').trim()}
      style={{ height: containerHeight }}
    >
      <div className="inner" ref={innerRef}>
        <Link href={baseUrl || '/'}>
          <a className="logo">
            <img src="/static/img/logo.svg" alt="NightGuide" />
          </a>
        </Link>
        {baseUrl !== '' && (
          <ul className="menu">
            <li>
              <Link href={`${baseUrl}/events`}>
                <a>{__('menu.events')}</a>
              </Link>
            </li>
            <li>
              <Link href={`${baseUrl}/articles`}>
                <a>{__('menu.blog')}</a>
              </Link>
            </li>
            <li className="explore">
              <Link href={`${baseUrl}/explore`}>
                <a>{__('menu.explore')}</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container > .inner {
          padding: 0.7rem 1rem 0;
          display: flex;
          align-items: center;
          transition: all 0.1s;
        }
        .container.sticky > .inner {
          position: fixed;
          padding-bottom: 0.7rem;
          z-index: 100;
          top: 0;
          width: 100%;
          background: ${colors.bg};
          box-sizing: border-box;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
        }
        .logo {
          display: block;
          flex-grow: 1;
        }
        .logo img {
          transition: width 0.2s;
          width: 4em;
          display: block;
        }
        .container.sticky .logo img {
          width: 3.5em;
        }
        li {
          list-style: none;
        }
        .menu {
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
        }
        .menu a {
          padding: 0 0.3em;
          font-size: 0.9em;
        }
        .explore {
          color: ${colors.textDark};
          background-color: ${colors.primaryButton};
          padding: 0.2em 0;
          margin-left: 0.7em;
          border-radius: 10px;
        }
        @media (min-width: 400px) {
          .container > .inner {
            padding: 0.7rem 2rem 0;
          }
          .logo img {
            width: 6.5em;
          }
          .container.sticky .logo img {
            width: 5em;
          }
          .menu a {
            padding: 0 1em;
          }
        }
      `}</style>
    </header>
  );
}

export default withNavigation(Header);
