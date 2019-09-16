import moment from 'moment-timezone';

export const SORT_DATE = 'date.from:asc,_id';
export const SORT_POPULARITY = 'date.interestedCount:desc,' + SORT_DATE;

export function getDateFilterById(id) {
  const dow = moment().day();
  let isWeekend;
  switch (id) {
    case 'today':
      return [
        moment().toDate(),
        moment()
          .set({ hour: 23, minute: 59 })
          .toDate(),
      ];
    case 'tomorrow':
      return [
        moment()
          .set({ hour: 0, minute: 0 })
          .add(1, 'day')
          .toDate(),
        moment()
          .set({ hour: 23, minute: 59 })
          .add(1, 'day')
          .toDate(),
      ];
    case 'thisWeekend':
      isWeekend = moment().isAfter(
        moment()
          .subtract(dow === 0 ? 1 : 0, 'week')
          .set({ day: 5, hour: 15, minute: 0 })
      );
      return [
        isWeekend
          ? moment().toDate()
          : moment()
              .set({ day: 5, hour: 15, minute: 0 })
              .toDate(),
        moment()
          .subtract(dow === 0 ? 1 : 0, 'week')
          .set({ day: 7, hour: 23, minute: 59 })
          .toDate(),
      ];
    default:
      return null;
  }
}

export function generateTicketRedirectUrl(eventId, dateIndex = 0) {
  return `/ticket-redirect?event=${eventId}&dateIndex=${dateIndex}`;
}

export function serializeFilter(filter) {
  const { dateFrom, dateTo, ...otherFilters } = filter;
  const serialized = otherFilters;
  if (dateFrom) {
    serialized.dateFrom = new Date(dateFrom).toISOString();
  }
  if (dateTo) {
    serialized.dateTo = new Date(dateTo).toISOString();
  }
  if (filter.venue && Array.isArray(filter.venue)) {
    serialized.venue = filter.venue.join(',');
  }
  return serialized;
}
