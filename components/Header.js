import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

import { Link } from '../routes';
import colors from '../styles/colors';
import SearchBar from './SearchBar';
import dimensions from '../styles/dimensions';
import PrimaryMenu from './PrimaryMenu';
import { useElemDimensions, useWindowWidth } from '../lib/hooks';
import { classNames } from '../lib/util';

function Header(props) {
  const { pageSlug } = props;

  const [innerRef, setInnerRef] = useState(null);
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const containerDimensions = useElemDimensions(innerRef);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const onScroll = throttle(() => {
      setSticky(window.scrollY > 0);
    }, 100);

    window.addEventListener('scroll', onScroll);

    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logo = <img src="/static/img/logo.svg" alt="NightGuide" />;

  const height = Math.round(containerDimensions.height);
  const compact = windowWidth <= 800;

  return (
    <header
      className={[sticky || searchOpen ? 'sticky' : '', 'container']
        .join(' ')
        .trim()}
      style={{ height }}
    >
      <div className="inner" ref={setInnerRef}>
        {!(compact && searchOpen) && (
          <div className="logo">
            {!compact && (
              <Link route="home">
                <a>{logo}</a>
              </Link>
            )}
            {compact && windowWidth !== null && (
              <button className="menu-toggle" onClick={toggleMenu}>
                {logo}
                <div className={['caret', menuOpen ? 'open' : ''].join(' ')} />
              </button>
            )}
          </div>
        )}
        <div className="search-bar">
          <div className="inner">
            {!!pageSlug && (
              <SearchBar
                offsetTop={height - 1}
                isOpen={!menuOpen && searchOpen}
                setIsOpen={setSearchOpen}
              />
            )}
            {searchOpen && (
              <div
                className={classNames(['close-search', searchOpen && 'show'])}
              >
                <button onClick={() => setSearchOpen(false)} />
              </div>
            )}
          </div>
        </div>
        {!(compact && searchOpen) && (
          <div className="menu-container">
            <PrimaryMenu
              open={menuOpen}
              offsetTop={height - 1}
              onClose={toggleMenu}
            />
          </div>
        )}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container > .inner {
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          transition: all 0.1s;
        }
        .container.sticky > .inner {
          position: fixed;
          z-index: 110;
          top: 0;
          width: 100%;
          background: ${colors.bg};
          box-sizing: border-box;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
        }
        .logo {
          margin-right: 1.5em;
        }
        .logo :global(img) {
          transition: width 0.2s;
          width: 3.5em;
          display: block;
        }
        .menu-toggle {
          display: flex;
        }
        .menu-toggle .caret {
          background: url(/static/img/logo-arrow.svg) no-repeat center center;
          width: 1.2em;
          align-self: stretch;
          transition: transform 0.1s;
        }
        .menu-toggle .caret.open {
          transform: rotate(180deg);
        }
        .search-bar {
          flex-grow: 1;
          display: flex;
        }
        .search-bar > .inner {
          position: relative;
          display: flex;
          align-items: center;
        }
        .menu-container {
          margin-left: 1em;
        }
        .close-search {
          display: flex;
          margin-left: 1em;
          justify-content: flex-end;
          align-items: center;
        }
        .close-search button {
          width: 2em;
          height: 2em;
          background: url(/static/img/video-close.svg) no-repeat center center;
        }
        @media (min-width: 400px) {
          .container > .inner {
            padding: 0.4rem 2rem;
          }
          .logo :global(img) {
            width: 5em;
          }
          .container.sticky .logo :global(img) {
            width: 5em;
          }
        }
        @media (min-width: 1100px) {
          .container > .inner {
            justify-content: center;
          }
          .menu-container {
            position: absolute;
            right: ${dimensions.bodyPadding};
          }
          .logo {
            position: absolute;
            left: ${dimensions.bodyPadding};
            top: 0.3em;
          }
          .search-bar {
            display: flex;
            justify-content: center;
            width: ${dimensions.pageWidth};
          }
          .close-search {
            position: absolute;
            right: -2.6em;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .close-search.show {
            opacity: 1;
          }
        }
        @media (min-width: 1300px) {
          .logo :global(img) {
            width: 6.5em;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
