import { Fragment, useState, useEffect, useRef } from 'react';
import colors from '../styles/colors';

import __ from '../lib/i18n';

function ReadMoreLess(props) {
  const { children, initialHeight, overhangSize = 80, backgroundImage } = props;

  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(initialHeight);
  const [hideReadMore, setHideReadMore] = useState(false);

  useEffect(() => {
    if (calculateHeight() <= initialHeight) {
      setHideReadMore(true);
    }
  }, []);

  const calculateHeight = () => {
    // Calculate height of all the children
    let children = [...containerRef.current.children];
    let height = 0;
    children.forEach(child => (height += child.offsetHeight));

    return height;
  };

  const toggle = () => {
    // If expanded, close it
    if (maxHeight !== initialHeight) return setMaxHeight(initialHeight);

    setMaxHeight(calculateHeight());
  };

  let open = maxHeight !== initialHeight;

  return (
    <Fragment>
      <div
        className="container"
        style={{
          maxHeight: open ? maxHeight : maxHeight - overhangSize,
          transition: 'max-height .5s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        ref={containerRef}
      >
        {children}
        {hideReadMore ? null : (
          <div
            className="overhang"
            style={{
              transition: 'opacity 0.25s',
              opacity: open ? 0 : 1,
              backgroundImage:
                backgroundImage ||
                `linear-gradient(to bottom, rgba(31, 31, 31, 0.44), ${
                  colors.bg
                } )`,
              content: '',
              height: `${overhangSize}px`,
              width: '100%',
              position: 'absolute',
              bottom: '0',
              left: '0',
            }}
          />
        )}
      </div>

      {!hideReadMore && (
        <button className="toggle" onClick={toggle}>
          {open ? __('readLess') : __('readMore')}
          <div
            className="caret"
            style={{ transform: `rotate( ${open ? '180deg' : '0'})` }}
          />
          {/*language=CSS*/}
          <style jsx>{`
            .toggle {
              margin-top: 0.5em;
              color: ${colors.linkText};
              display: flex;
              align-items: center;
            }
            .caret {
              transition: transform 0.25s;
              display: inline;
              margin-left: 0.5em;
              width: 10px;
              height: 7px;
              background: url(/static/img/read-more-less-caret.svg) no-repeat
                center center;
            }
          `}</style>
        </button>
      )}
    </Fragment>
  );
}

export default ReadMoreLess;
