export function getFutureEventDates(dates) {
  return dates.filter(date => {
    return new Date(date.to ? date.to : date.from) > new Date();
  });
}
