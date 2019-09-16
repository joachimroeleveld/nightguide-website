import React, { useMemo } from 'react';

import { getEvents } from '../lib/api';
import SectionLoader from '../components/SectionLoader';
import EventDateFilterBar from '../components/events/EventDateFilterBar';
import __, { __city } from '../lib/i18n';
import EventRow from '../components/events/EventRowOld';
import withPageLayout from '../components/PageLayout';
import { useDateFilter } from '../components/events/hooks';
import { getConfig } from './cities';

function ExploreAreasPage(props) {
  const { pageSlug, routeParams, preloadedEvents, query, listings } = props;
  const { AREAS } = listings;

  const cityName = __city(pageSlug)('name');

  const {
    dateFilter,
    dateFilterChanged,
    setDateFilter,
    dateFilterId,
  } = useDateFilter(query, props);

  const sections = useMemo(
    () =>
      Object.keys(AREAS).map((id, index) => {
        const { name, venues } = AREAS[id];
        return {
          id,
          title: name,
          preloaded: !dateFilterChanged ? preloadedEvents[index] : {},
          filter: {
            venue: venues,
            ...(dateFilter
              ? { dateFrom: dateFilter[0], dateTo: dateFilter[1] }
              : {}),
          },
        };
      }),
    [dateFilter]
  );

  const renderSection = ({ id, filter, preloaded = {} }) => (
    <EventRow
      filter={filter}
      seeAllParams={{
        ...filter,
        area: id,
      }}
      routeParams={routeParams}
      events={preloaded.results}
      totalCount={preloaded.totalCount}
    />
  );

  return (
    <main>
      <h1>{__('ExploreAreasPage.title', { city: cityName })}</h1>
      <div className="filter">
        <EventDateFilterBar
          activeButton={dateFilterId}
          onChange={setDateFilter}
          startDate={dateFilter && dateFilter[0]}
          endDate={dateFilter && dateFilter[1]}
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

ExploreAreasPage.getInitialProps = async ({ query }) => {
  const { dateFrom, dateTo, pageSlug } = query;
  const listings = getConfig(pageSlug);

  const preloadedEvents = await Promise.all(
    Object.values(listings.AREAS)
      .slice(0, 4)
      .map(({ venues }) =>
        getEvents({
          serialize: false,
          limit: 8,
          query: {
            venue: venues,
            dateFrom,
            dateTo,
          },
        })
      )
  );

  return {
    listings,
    preloadedEvents,
  };
};

const getBreadcrumbs = () => [{ key: 'exploreAreas' }];

export default withPageLayout({ getBreadcrumbs })(ExploreAreasPage);
