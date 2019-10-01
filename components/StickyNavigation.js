import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  useElemDimensions,
  useHeaderHeight,
  useOnScroll,
  useWindowWidth,
} from '../lib/hooks';
import { classNames } from '../lib/util';

StickyNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

function StickyNavigation(props) {
  const { title, items, onItemClick, renderItem } = props;

  const [containerRef, setContainerRef] = useState(null);
  const containerDimensions = useElemDimensions(containerRef);
  const headerHeight = useHeaderHeight();
  const [isSticky, setIsSticky] = useState(false);
  const windowWidth = useWindowWidth();

  useOnScroll(() => {
    const isSticky =
      windowWidth > 800 &&
      window.scrollY - containerDimensions.top + headerHeight > 0;
    setIsSticky(isSticky);
  }, [windowWidth, containerDimensions, headerHeight]);

  return (
    <nav ref={setContainerRef}>
      <div
        style={{
          width: containerDimensions.width,
          top: isSticky && headerHeight,
        }}
        className={classNames(['container', isSticky && 'sticky'])}
      >
        <strong className="title">{title}</strong>
        <ul className="list">
          {items.map((item, index) => {
            return (
              <li key={index} className="item">
                <button onClick={() => onItemClick(item)}>
                  {renderItem(item, index)}
                </button>
              </li>
            );
          })}
        </ul>
        {/*language=CSS*/}
        <style jsx>{`
          .container.sticky {
            padding-top: 2em;
          }
          .sticky {
            position: fixed;
          }
          .title {
            display: block;
            margin-bottom: 0.5em;
          }
          .item {
            margin: 0.1em 0;
          }
          .item button {
            cursor: pointer;
            text-align: left;
          }
          @media (min-width: 800px) {
            .item {
              margin: 0.4em 0;
            }
          }
        `}</style>
      </div>
    </nav>
  );
}

export default StickyNavigation;
