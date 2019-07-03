export function generateTicketRedirectUrl(eventId, dateIndex = 0) {
  return `/ticket-redirect?event=${eventId}&dateIndex=${dateIndex}`;
}
