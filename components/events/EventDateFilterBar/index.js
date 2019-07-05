import React, { useState, useEffect } from 'react';
import moment from 'moment';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import css from 'styled-jsx/css';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/constants';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

import SecondaryButton from '../../SecondaryButton';
import __ from '../../../lib/i18n';

const FILTER_ITEMS = [
  {
    key: 'today',
    value: [
      new Date(),
      moment()
        .set({ hour: 23, minute: 59 })
        .toDate(),
    ],
    label: __('today'),
  },
  {
    key: 'tomorrow',
    value: [
      moment()
        .set({ hour: 0, minute: 0 })
        .add(1, 'day')
        .toDate(),
      moment()
        .set({ hour: 23, minute: 59 })
        .add(1, 'day')
        .toDate(),
    ],
    label: __('tomorrow'),
  },
  {
    key: 'thisWeekend',
    value: [
      moment()
        .day(5)
        .set({ hour: 17, minute: 0 })
        .toDate(),
      moment()
        .day(7)
        .set({ hour: 23, minute: 59 })
        .toDate(),
    ],
    label: __('thisWeekend'),
  },
  {
    key: 'custom',
    label: __('pickDate'),
  },
];

function EventDateFilterBar(props) {
  const { onChange } = props;

  const [focusedInput, setFocusedInput] = useState(START_DATE);
  const [currentButton, setCurrentButton] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fullscreenMode, setFullScreenMode] = useState(true);

  useEffect(() => {
    const resizeListener = debounce(() => {
      setFullScreenMode(window.innerWidth < 700);
    }, 100);
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const onClick = key => () => {
    reset();

    if (key !== currentButton) {
      if (key !== 'custom') {
        const val = find(FILTER_ITEMS, { key }).value;
        onChange(val);
        setCurrentButton(key);
      } else {
        togglePicker();
      }
    }
  };

  const reset = () => {
    setCurrentButton(null);
    setEndDate(null);
    setStartDate(null);
    onChange(null);
  };

  const togglePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onPickerDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (endDate) {
      onChange([startDate, endDate]);
      setCurrentButton('custom');
      togglePicker();
    }
  };

  const onFocusChange = focusedInput => {
    setFocusedInput(!focusedInput ? START_DATE : focusedInput);
  };

  const getTitle = key => {
    if (key === 'custom' && currentButton === key) {
      // Localized form of day and month
      const format = date =>
        date
          .format('LL')
          .match(/^(\w+ \w+)/)
          .pop();
      return `${format(startDate)} - ${format(endDate)}`;
    } else {
      return find(FILTER_ITEMS, { key }).label;
    }
  };

  const dynamicPickerProps = {};

  if (fullscreenMode) {
    dynamicPickerProps.orientation = 'verticalScrollable';
  }

  return (
    <div className="container">
      {FILTER_ITEMS.map(({ key }) => (
        <div key={key} className="button">
          <SecondaryButton
            active={key === currentButton}
            title={getTitle(key)}
            key={key}
            onClick={onClick(key)}
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

      {showDatePicker && (
        <div
          className={['picker', fullscreenMode ? 'fullscreen' : ''].join(' ')}
        >
          <DayPickerRangeController
            startDate={startDate}
            endDate={endDate}
            onDatesChange={onPickerDateChange}
            focusedInput={focusedInput}
            onFocusChange={onFocusChange}
            onOutsideClick={togglePicker}
            numberOfMonths={2}
            hideKeyboardShortcutsPanel={true}
            {...dynamicPickerProps}
          />
        </div>
      )}

      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          margin: -0.25em;
          position: relative;
        }
        .button {
          margin: 0.25em;
        }
        .picker {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 150;
        }
        .picker.fullscreen {
          position: fixed;
          top: 10%;
          width: 80%;
          height: 80%;
          left: 10%;
        }
      `}</style>
    </div>
  );
}

export default EventDateFilterBar;
