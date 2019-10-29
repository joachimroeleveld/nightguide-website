import moment from 'moment-timezone';

export function isEventDatePast(date) {
  return new Date(date.to ? date.to : date.from) < moment().toDate();
}
