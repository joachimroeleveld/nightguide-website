import { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { START_DATE } from 'react-dates/constants';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment-timezone';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './react_dates_overrides.css';
import __ from '../../lib/i18n';
import RadioButton from '../RadioButton';
import { classNames } from '../../lib/util';
import { useOnResize } from '../../lib/hooks';
import { getDateFilterById } from './util';

EventDateFilter.propTypes = {
  dateFrom: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  dateTo: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  dateFilterId: PropTypes.string,
};

function EventDateFilter(props) {
  const { dateFrom, dateTo, dateFilterId } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDatePickerDirty, setIsDatePickerDirty] = useState(false);
  const [focusedInput, setFocusedInput] = useState(START_DATE);
  const [startDate, setStartDate] = useState(
    dateFrom ? moment(dateFrom) : null
  );
  const [endDate, setEndDate] = useState(dateTo ? moment(dateTo) : null);
  const [datePickerFullscreen, setDatePickerFullscreen] = useState(true);

  useOnResize(() => {
    setDatePickerFullscreen(window.innerWidth <= 800);
  });

  useEffect(() => {
    setStartDate(dateFrom ? moment(dateFrom) : null);
    setEndDate(dateTo ? moment(dateTo) : null);
  }, [dateTo, dateFrom]);

  const onChange = dateFilterId => e => {
    if (dateFilterId === 'next7Days') {
      props.onChange({ dateFilterId: null, dateFrom: null, dateTo: null });
    } else if (dateFilterId !== 'custom') {
      const [dateFrom, dateTo] = getDateFilterById(dateFilterId);
      props.onChange({
        dateFilterId,
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
      });
    } else {
      togglePicker();
    }
  };

  const togglePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onPickerDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setIsDatePickerDirty(true);

    if (endDate) {
      props.onChange({
        dateFilterId: 'custom',
        dateFrom: moment(startDate)
          .set({ hour: 0, minute: 0 })
          .toISOString(),
        dateTo: moment(endDate)
          .set({ hour: 23, minute: 59 })
          .toISOString(),
      });
      togglePicker();
      setIsDatePickerDirty(false);
    }
  };

  const onFocusChange = focusedInput => {
    setFocusedInput(!focusedInput ? START_DATE : focusedInput);
  };

  const dynamicPickerProps = {};

  if (datePickerFullscreen) {
    dynamicPickerProps.orientation = 'verticalScrollable';
  }

  const renderCalendarInfo = () => (
    <Fragment>
      <div
        className={['info', datePickerFullscreen ? 'fullscreen' : ''].join(' ')}
      >
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
          align-items: center;
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
          width: 1em;
          height: 1em;
          background: url(/static/img/close.svg) no-repeat center center;
          background-size: cover;
        }
      `}</style>
    </Fragment>
  );

  return (
    <div className="container">
      <RadioButton
        checked={!dateFilterId}
        onChange={onChange('next7Days')}
        label={__('EventFilters.dateFilters.next7Days')}
      />
      <RadioButton
        checked={dateFilterId === 'today'}
        onChange={onChange('today')}
        label={__('EventFilters.dateFilters.today')}
      />
      <RadioButton
        checked={dateFilterId === 'tomorrow'}
        onChange={onChange('tomorrow')}
        label={__('EventFilters.dateFilters.tomorrow')}
      />
      <RadioButton
        checked={dateFilterId === 'thisWeekend'}
        onChange={onChange('thisWeekend')}
        label={__('EventFilters.dateFilters.thisWeekend')}
      />
      <RadioButton
        checked={dateFilterId === 'custom'}
        onChange={onChange('custom')}
        label={
          __('EventDateFilters.custom') +
          (dateFilterId === 'custom' && endDate
            ? ` (${startDate.format('L')} - ${endDate.format('L')})`
            : '')
        }
      />
      {showDatePicker && (
        <div
          className={classNames([
            'picker',
            datePickerFullscreen && 'fullscreen',
          ])}
        >
          <DayPickerRangeController
            calendarInfoPosition={datePickerFullscreen ? 'bottom' : 'top'}
            startDate={
              dateFilterId === 'custom' || isDatePickerDirty ? startDate : null
            }
            endDate={
              dateFilterId === 'custom' || isDatePickerDirty ? endDate : null
            }
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
      {showDatePicker && <div className="overlay" />}

      {/*language=CSS*/}
      <style jsx>{`
        .picker {
          z-index: 150;
        }
        .picker.fullscreen {
          position: fixed;
          top: 10%;
          width: 80%;
          height: 80%;
          left: 10%;
        }
        .picker:not(.fullscreen) {
          position: absolute;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }
        .container :global(.form-radio) {
          margin: 0.3em 0;
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
      `}</style>
    </div>
  );
}

export default EventDateFilter;
