import React, { useState, memo, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import find from 'lodash/find';
import css from 'styled-jsx/css';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/constants';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';
import PropTypes from 'prop-types';

import colors from '../../../styles/colors';
import dimensions from '../../../styles/dimensions';
import { withNavigation } from '../../Navigation';
import SecondaryButton from '../../SecondaryButton';
import __ from '../../../lib/i18n';
import { classNames } from '../../../lib/util';
import { setUrlParams } from '../../../lib/util/routes';
import { getDateFilterById } from '../util';
import {
  useElemDimensions,
  useHeaderHeight,
  useOnResize,
  useOnScroll,
  useWindowWidth,
} from '../../../lib/hooks';

const FILTER_ITEMS = [
  {
    filterId: 'today',
    value: getDateFilterById('today'),
    label: __('dates.today'),
  },
  {
    filterId: 'tomorrow',
    value: getDateFilterById('tomorrow'),
    label: __('dates.tomorrow'),
  },
  {
    filterId: 'weekend',
    value: getDateFilterById('weekend'),
    label: __('dates.thisWeekend'),
  },
  {
    filterId: 'custom',
    label: __('pickDate'),
  },
];

EventDateFilterBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

function EventDateFilterBar(props) {
  const [sticky, setSticky] = useState(false);
  const [containerRef, setContainerRef] = useState(null);
  const [innerRef, setInnerRef] = useState(null);
  const innerDimensions = useElemDimensions(innerRef);
  const windowWidth = useWindowWidth();
  const headerHeight = useHeaderHeight();
  const [focusedInput, setFocusedInput] = useState(START_DATE);
  const [activeButton, setActiveButton] = useState(
    props.activeButton || (props.startDate && 'custom')
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(
    props.startDate ? moment(props.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    props.endDate ? moment(props.endDate) : null
  );
  const [fullscreenMode, setFullScreenMode] = useState(true);
  const buttonsRef = useRef(null);

  useEffect(() => {
    setActiveButton(props.activeButton || (props.startDate && 'custom'));
  }, [props.activeButton, props.startDate]);

  useOnResize(() => {
    setFullScreenMode(window.innerWidth < 700);
  });

  useOnScroll(() => {
    if (containerRef) {
      const elemTop = containerRef.getBoundingClientRect().top;
      setSticky(elemTop < headerHeight);
    }
  }, [containerRef, headerHeight]);

  const onClick = filterId => () => {
    if (filterId !== activeButton) {
      if (filterId !== 'custom') {
        const val = find(FILTER_ITEMS, { filterId }).value;
        onChange(val, filterId);
        setActiveButton(filterId);
        resetScroll();
      } else {
        reset();
        togglePicker();
      }
    } else {
      reset();
    }
  };

  const onChange = (val, filterId = null) => {
    if (val) {
      setUrlParams({
        dateFilter: filterId,
        dateFrom: val[0].toISOString(),
        dateTo: val[1].toISOString(),
      });
    } else {
      setUrlParams({
        dateFilter: null,
        dateFrom: null,
        dateTo: null,
      });
    }
    props.onChange(val);
  };

  const reset = () => {
    setActiveButton(null);
    setEndDate(null);
    setStartDate(null);
    onChange(null);
  };

  const resetScroll = () => {
    buttonsRef.current.scrollLeft = 0;
  };

  const togglePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onPickerDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (endDate) {
      onChange([
        moment(startDate).set({ hour: 0, minute: 0 }),
        moment(endDate).set({ hour: 23, minute: 59 }),
      ]);
      setActiveButton('custom');
      togglePicker();
      resetScroll();
    }
  };

  const onFocusChange = focusedInput => {
    setFocusedInput(!focusedInput ? START_DATE : focusedInput);
  };

  const getTitle = filterId => {
    if (
      filterId === 'custom' &&
      activeButton === filterId &&
      startDate &&
      endDate
    ) {
      // Localized form of day and month
      const format = date =>
        date
          .format('LL')
          .match(/^(\w+ \w+)/)
          .pop();
      if (!startDate.isSame(endDate, 'day')) {
        return `${format(startDate)} - ${format(endDate)}`;
      } else {
        return `${format(startDate)}`;
      }
    } else {
      return find(FILTER_ITEMS, { filterId }).label;
    }
  };

  const renderCalendarInfo = () => (
    <React.Fragment>
      <div className={['info', fullscreenMode ? 'fullscreen' : ''].join(' ')}>
        <strong className="text">{__('pickADateRange')} </strong>
        <button onClick={togglePicker} className="close-button" />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .info {
          color: #333;
          font-size: 14px;
          padding: 10px 21px;
          background-color: #dbdbdb;
          display: flex;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }
        .info .text {
          font-weight: 600;
          flex-grow: 1;
        }
        .info.fullscreen {
          position: relative;
          top: -41px;
        }
        .close-button {
          width: 23px;
          height: 23px;
          background: url(/static/img/video-close.svg) no-repeat center center;
          background-size: cover;
        }
      `}</style>
    </React.Fragment>
  );

  const dynamicPickerProps = {};

  if (fullscreenMode) {
    dynamicPickerProps.orientation = 'verticalScrollable';
  }

  const buttons =
    windowWidth > 800
      ? FILTER_ITEMS
      : [
          ...(activeButton
            ? [find(FILTER_ITEMS, { filterId: activeButton })]
            : []),
          ...FILTER_ITEMS.filter(item => item.filterId !== activeButton),
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
              {buttons.map(({ filterId }) => (
                <div key={filterId} className="button">
                  <SecondaryButton
                    active={filterId === activeButton}
                    title={getTitle(filterId)}
                    key={filterId}
                    onClick={onClick(filterId)}
                    /*language=CSS*/
                    {...css.resolve`
                    .button {
                      background-position: 0.5em center;
                    }
                    .button.active {
                      padding-left: 1.8em;
                      background-image: url(/static/img/secondary-button-close.svg);
                    }
                  `}
                  />
                </div>
              ))}
            </div>
            {showDatePicker && <div className="overlay" />}
            {showDatePicker && (
              <div
                className={classNames([
                  'picker',
                  fullscreenMode && 'fullscreen',
                ])}
              >
                <DayPickerRangeController
                  calendarInfoPosition={fullscreenMode ? 'bottom' : 'top'}
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onPickerDateChange}
                  focusedInput={focusedInput}
                  onFocusChange={onFocusChange}
                  onOutsideClick={togglePicker}
                  numberOfMonths={2}
                  hideKeyboardShortcutsPanel={true}
                  minimumNights={0}
                  renderCalendarInfo={renderCalendarInfo}
                  {...dynamicPickerProps}
                />
              </div>
            )}
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
          margin: 0.25em;
          white-space: nowrap;
        }
        .picker {
          position: absolute;
          top: 110%;
          z-index: 150;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }
        .picker.fullscreen {
          position: fixed;
          top: 10%;
          width: 80%;
          height: 80%;
          left: 10%;
        }
        .overlay {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 140;
          background: rgba(0, 0, 0, 0.7);
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

export default withNavigation(memo(EventDateFilterBar));
