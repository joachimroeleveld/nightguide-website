import moment from 'moment-timezone';

import __ from '../i18n';

moment.locale('en');

const FORMAT_SHORT = 'ddd, D MMM LT';

export function formatEventDate(dateFrom, dateTo, opts = {}) {
  const { showDateTo = true } = opts;

  const dateFromMoment = moment(dateFrom);
  const dateToMoment = moment(dateTo);

  let formatted;

  const isNow = moment().isBetween(dateFromMoment, dateToMoment);
  const isToday = moment().isSame(dateFromMoment, 'day');
  const isTomorrow = moment()
    .add(1, 'day')
    .isSame(dateFromMoment, 'day');
  if (!isToday && !isTomorrow) {
    formatted = dateFromMoment.format(FORMAT_SHORT);
  } else if (isNow) {
    formatted = `${__('dates.now')}`;
  } else if (isToday) {
    formatted = `${__('dates.today')} ${dateFromMoment.format('LT')}`;
  } else if (isTomorrow) {
    formatted = `${__('dates.tomorrow')} ${dateFromMoment.format('LT')}`;
  }

  if (showDateTo) {
    formatted += ' - ';

    if (dateFromMoment.diff(dateToMoment, 'days') > 1) {
      formatted += dateToMoment.format(FORMAT_SHORT);
    } else {
      formatted += dateToMoment.format('LT');
    }
  }

  return formatted;
}
