import moment from 'moment-timezone';

moment.locale('en');

const FORMAT_SHORT = 'ddd, D MMM LT';

export function formatEventDate(dateFrom, dateTo) {
  const dateFromMoment = moment(dateFrom);

  if (dateTo) {
    const dateToMoment = moment(dateTo);

    let formatted = dateFromMoment.format(FORMAT_SHORT) + ' - ';

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
