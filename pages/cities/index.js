export function getListings(pageSlug) {
  return (
    {
      'es/ibiza': require('./ibiza/listings'),
    }[pageSlug] || {}
  );
}
