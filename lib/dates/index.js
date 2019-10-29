import moment from 'moment-timezone';

import __ from '../i18n';

moment.locale('en');

const FORMAT_SHORT = 'ddd, D MMM LT';

export function formatEventDate(dateFrom, dateTo) {
  const dateFromMoment = moment(dateFrom);

  if (dateTo) {
    const dateToMoment = moment(dateTo);

    let formatted;

    const isNow = moment().isBetween(dateFromMoment, dateToMoment);
    if (!isNow) {
      formatted = dateFromMoment.format(FORMAT_SHORT) + ' - ';
    } else {
      formatted = `${__('dates.now')} - `;
    }

    if (dateFromMoment.diff(dateToMoment, 'days') > 1) {
      formatted += dateToMoment.format(FORMAT_SHORT);
    } else {
      formatted += dateToMoment.format('LT');
    }

    return formatted;
  } else {
    return dateFromMoment.format(FORMAT_SHORT);
  }
}
