import { useEffect, useState, memo, Fragment } from 'react';
import throttle from 'lodash/throttle';

import { Link } from '../routes';
import colors from '../styles/colors';
import SearchBar from './SearchBar';
import dimensions from '../styles/dimensions';
import PrimaryMenu from './PrimaryMenu';
import { useElemDimensions, useWindowWidth } from '../lib/hooks';
import { classNames } from '../lib/util';
import { withNavigation } from './Navigation';

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

  const height = Math.round(containerDimensions.height) || 56;
  const showMenu = windowWidth <= 800;

  return (
    <header
      id="page-header"
      className={[sticky || searchOpen ? 'sticky' : '', 'container']
        .join(' ')
        .trim()}
      style={{ height }}
    >
      <div className="inner" ref={setInnerRef}>
        {!(showMenu && searchOpen) && (
          <div className="logo">
            {!showMenu && (
              <Link route="home">
                <a>{logo}</a>
              </Link>
            )}
            {showMenu && windowWidth !== null && (
              <button className="menu-toggle" onClick={toggleMenu}>
                {logo}
                <div className={['caret', menuOpen ? 'open' : ''].join(' ')} />
              </button>
            )}
          </div>
        )}
        {!!pageSlug && (
          <Fragment>
            <div
              className={classNames(['search-bar', searchOpen && 'visible'])}
            >
              <div className="inner">
                <SearchBar
                  offsetTop={height - 1}
                  isOpen={!menuOpen && searchOpen}
                  setIsOpen={setSearchOpen}
                />
                {searchOpen && (
                  <div
                    className={classNames([
                      'close-search',
                      searchOpen && 'show',
                    ])}
                  >
                    <button onClick={() => setSearchOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        )}
        {!searchOpen && (
          <div className="menu">
            <PrimaryMenu
              open={menuOpen}
              offsetTop={height - 1}
              onClose={toggleMenu}
            />
          </div>
        )}
        <div className="buttons">
          <Link route="help-center">
            <a className="help" />
          </Link>
          <button
            className={classNames(['search-toggle', searchOpen && 'hide'])}
            onClick={() => setSearchOpen(!searchOpen)}
          />
        </div>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container > .inner {
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          transition: all 0.1s;
          box-sizing: border-box;
          min-height: 56px;
        }
        .container.sticky > .inner {
          position: fixed;
          z-index: 110;
          top: 0;
          width: 100%;
          background: ${colors.bg};
          box-sizing: border-box;
          box-shadow: ${colors.headerShadow};
        }
        .logo {
          margin-right: 1.5em;
        }
        .logo :global(img) {
          transition: width 0.2s;
          width: 65px;
          display: block;
        }
        .menu {
          flex-grow: 1;
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
          z-index: 0;
          position: relative;
          flex-grow: 1;
          display: flex;
          transition: opacity 0.3s;
          opacity: 0;
        }
        .search-bar.visible {
          opacity: 1;
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
          background: url(/static/img/close.svg) no-repeat center center;
        }
        .buttons {
          display: flex;
          align-items: center;
        }
        .search-toggle {
          width: 14px;
          height: 14px;
          padding: 1em;
          background: url(/static/img/search-icon.svg) no-repeat center center;
        }
        .help {
          display: block;
          width: 20px;
          height: 20px;
          margin: 0 1.5em 0 1.5em;
          padding: 1em;
          background: url(/static/img/header-help.svg) no-repeat center center;
        }
        .search-toggle.hide {
          display: none;
        }
        @media (min-width: 400px) {
          .container > .inner {
            padding: 0.4rem 1.5rem;
          }
          .logo :global(img) {
            width: 78px;
          }
          .container.sticky .logo :global(img) {
            width: 5em;
          }
        }
        @media (min-width: 1200px) {
          .container > .inner {
            justify-content: center;
            min-height: 53px;
          }
          .menu-container {
            position: absolute;
            right: ${dimensions.bodyPadding};
          }
          .logo {
            position: absolute;
            z-index: 1;
            left: 1.5em;
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
      `}</style>
    </header>
  );
}

export default memo(withNavigation(Header));
