import React, { useMemo } from 'react';

import { getEvents } from '../lib/api';
import SectionLoader from '../components/SectionLoader';
import EventDateFilterBar from '../components/events/EventDateFilterBar';
import __, { __city } from '../lib/i18n';
import EventRow from '../components/events/EventRow';
import withPageLayout from '../components/PageLayout';
import { useDateFilter } from '../components/events/hooks';
import { getListings } from './cities';

function ExploreArtistsPage(props) {
  const { pageSlug, routeParams, preloadedEvents, query, listings } = props;
  const { ARTISTS } = listings;

  const cityName = __city(pageSlug)('name');

  const {
    dateFilter,
    setDateFilter,
    dateFilterChanged,
    dateFilterId,
  } = useDateFilter(query, props);

  const sections = useMemo(
    () =>
      Object.keys(ARTISTS).map((key, index) => ({
        title: key,
        filter: {
          artist: ARTISTS[key],
          ...(dateFilter
            ? { dateFrom: dateFilter[0], dateTo: dateFilter[1] }
            : {}),
        },
        preloaded: !dateFilterChanged ? preloadedEvents[index] : {},
      })),
    [dateFilter]
  );

  const renderSection = ({ filter, preloaded = {} }) => (
    <EventRow
      filter={filter}
      routeParams={routeParams}
      events={preloaded.results}
      totalCount={preloaded.totalCount}
    />
  );

  return (
    <main>
      <h1>{__('ExploreArtistsPage.title', { city: cityName })}</h1>
      <div className="filter">
        <EventDateFilterBar
          activeButton={dateFilterId}
          startDate={dateFilter && dateFilter[0]}
          endDate={dateFilter && dateFilter[1]}
          onChange={setDateFilter}
        />
      </div>
      <SectionLoader
        sections={sections}
        renderSection={renderSection}
        preloadedSections={4}
      />
    </main>
  );
}

ExploreArtistsPage.getInitialProps = async ({ query }) => {
  const { dateFrom, dateTo, pageSlug } = query;
  const listings = getListings(pageSlug);
  const { ARTISTS } = listings;

  const preloadedEvents = await Promise.all(
    Object.keys(ARTISTS)
      .slice(0, 4)
      .map(key =>
        getEvents({
          limit: 8,
          query: {
            artist: ARTISTS[key],
            dateFrom,
            dateTo,
          },
        })
      )
  );

  return {
    listings,
    dateFrom,
    dateTo,
    preloadedEvents,
  };
};

const getBreadcrumbs = () => [{ key: 'exploreArtists' }];

export default withPageLayout({ getBreadcrumbs })(ExploreArtistsPage);
