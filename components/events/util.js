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

export function generateTicketPageUrl(provider, providerEventId, providerData) {
  let url;
  const search = new URLSearchParams();
  let addUtmParams = true;

  if (provider === 'eventix') {
    const { shopId } = providerData;
    if (shopId) {
      url = `https://shop.eventix.io/${shopId}/tickets`;
      search.set('eventId', providerEventId);
    } else {
      url = `https://shop.eventix.io/${providerEventId}/tickets`;
    }
  } else if (provider === 'eventbrite') {
    const { partnerId, programName } = providerData;
    if (programName) {
      url = `https://www.eventbrite.com/e/${providerEventId}`;
      search.set('aff', programName);
      if (partnerId) {
        search.set('afu', partnerId);
      }
      addUtmParams = false;
    }
  } else if (provider === 'paylogic') {
    url = `https://frontoffice.paylogic.nl`;
    search.set('event_id', providerEventId);
  } else if (provider === 'tibbaa') {
    url = `https://tibbaa.com/order/${providerEventId}`;
  } else if (provider === 'ticketmaster') {
    if (providerEventId.startsWith('https://')) {
      url = providerEventId;
    } else {
      url = `https://www.ticketmaster.nl/event/${providerEventId}`;
    }
  } else if (provider === 'gaygo') {
    const { promotorId } = providerData;
    if (promotorId) {
      url = `https://shop.gaygotickets.com/#/promotor/${promotorId}/events/${providerEventId}`;
    }
  } else if (provider === 'yourticketprovider') {
    url = `https://widget.yourticketprovider.nl/?productid=${providerEventId}#/tickets/${providerEventId}`;
  } else if (provider === 'exceed') {
    const { list } = providerData;
    url = `https://xceed.me/list/${list}/event/${providerEventId}`;
  } else {
    return null;
  }

  if (addUtmParams) {
    search.set('utm_source', 'nightguide');
    search.set('utm_medium', 'referral');
    search.set('utm_campaign', 'buy_tickets');
  }

  const eventUrl = new URL(url);
  eventUrl.search = search.toString();

  return eventUrl.toString();
}
