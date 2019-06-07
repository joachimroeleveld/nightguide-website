export function getFutureEventDates(dates) {
  return dates.filter(date => new Date(date.to) > new Date());
}
