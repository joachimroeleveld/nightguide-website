import React, { useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import css from 'styled-jsx/css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

import colors from '../../styles/colors';
import dimensions from '../../styles/dimensions';
import { withNavigation } from '../Navigation';
import SecondaryButton from '../SecondaryButton';
import { classNames } from '../../lib/util';
import {
  useElemDimensions,
  useHeaderHeight,
  useOnScroll,
  useWindowWidth,
} from '../../lib/hooks';

EventFilterBar.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      activeLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function EventFilterBar(props) {
  const { items, onItemPress } = props;

  const [sticky, setSticky] = useState(false);
  const [containerRef, setContainerRef] = useState(null);
  const [innerRef, setInnerRef] = useState(null);
  const innerDimensions = useElemDimensions(innerRef);
  const windowWidth = useWindowWidth();
  const headerHeight = useHeaderHeight();
  const buttonsRef = useRef(null);

  useOnScroll(() => {
    if (containerRef) {
      const elemTop = containerRef.getBoundingClientRect().top;
      setSticky(elemTop < headerHeight);
    }
  }, [containerRef, headerHeight]);

  const onClick = filterId => () => {
    onItemPress(filterId);
    if (!find(items, { id: filterId }).active) {
      resetScroll();
    }
  };

  const resetScroll = () => {
    buttonsRef.current.scrollLeft = 0;
  };

  const buttons = !(windowWidth < 800 && sticky)
    ? items
    : [
        ...items.filter(item => item.active),
        ...items.filter(item => !item.active),
      ];

  return (
    <div
      className={classNames(['container', sticky && 'sticky'])}
      style={{ height: innerDimensions.height || 'auto' }}
      ref={setContainerRef}
    >
      <div
        className="inner"
        style={{ top: sticky ? `${headerHeight - 1}px` : '0' }}
        ref={setInnerRef}
      >
        <div className="bar">
          <div className="picker-wrapper">
            <div className="buttons" ref={buttonsRef}>
              {buttons.map(({ id: filterId, activeLabel, label, active }) => (
                <div key={filterId} className="button">
                  <SecondaryButton
                    active={active}
                    title={active ? activeLabel : label}
                    key={filterId}
                    onClick={onClick(filterId)}
                    /*language=CSS*/
                    {...css.resolve`
                    .button {
                      background-position: 0.5em center;
                    }
                    .button.active {
                      padding-left: 2em;
                      background-image: url(/static/img/secondary-button-close.svg);
                      background-position: 0.8em center;
                    }
                  `}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shadow" />
      </div>

      {/*language=CSS*/}
      <style jsx>{`
        .container {
          width: 100%;
        }
        .sticky .inner {
          position: fixed;
          left: 0;
          z-index: 110;
          width: 100%;
          padding-top: 0.3em;
          background: ${colors.bg};
        }
        .sticky .bar {
          padding: 0.5em ${dimensions.bodyPadding};
          position: relative;
          z-index: 1;
          background: ${colors.bg};
          border-top: 1px solid ${colors.separator};
        }
        .buttons {
          overflow-x: auto;
          display: flex;
          flex-wrap: wrap;
          margin: -0.25em;
        }
        .picker-wrapper {
          position: relative;
          max-width: ${dimensions.pageWidth};
          margin: 0 auto;
        }
        .sticky .button:last-child::after {
          content: ' ';
          width: ${dimensions.bodyPadding};
          height: 1px;
          display: inline-block;
        }
        .sticky .buttons {
          flex-wrap: nowrap;
          margin-right: 0;
        }
        .sticky .shadow {
          height: 10px;
          width: 100%;
          position: absolute;
          bottom: 0;
          box-shadow: ${colors.headerShadow};
          z-index: 0;
        }
        .button {
          margin: 0.25em 0.2em;
          white-space: nowrap;
        }
        @media (max-width: ${dimensions.pageWidth}) {
          .sticky .bar {
            margin-right: -${dimensions.bodyPadding};
          }
        }
      `}</style>
    </div>
  );
}

export default withNavigation(memo(EventFilterBar));
