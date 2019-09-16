import React, { useState, useMemo } from 'react';

import { getEvents, getVenues } from '../lib/api';
import SectionLoader from '../components/SectionLoader';
import EventDateFilterBar from '../components/events/EventDateFilterBar';
import __, { __city } from '../lib/i18n';
import EventRow from '../components/events/EventRowOld';
import withPageLayout from '../components/PageLayout';
import VenueSlider from '../components/venues/VenueSlider';
import dimensions from '../styles/dimensions';
import { useDateFilter } from '../components/events/hooks';
import { getConfig } from './cities';

function ExploreVenuesPage(props) {
  const {
    pageSlug,
    preloadedVenues,
    routeParams,
    preloadedEvents,
    query,
    listings,
  } = props;
  const { VENUES } = listings;

  const cityName = __city(pageSlug)('name');

  const [venues, setVenues] = useState(preloadedVenues);
  const [reachedEnd, setReachedEnd] = useState(false);
  const {
    dateFilter,
    dateFilterId,
    setDateFilter,
    dateFilterChanged,
  } = useDateFilter(query, props);

  const loadVenues = async () => {
    const { results, totalCount } = await getVenues({
      limit: 10,
      offset: venues.length,
      query: {
        exclude: VENUES,
        pageSlug,
        sortBy: '_id',
      },
    });
    const allVenues = venues.concat(results);
    setVenues(allVenues);
    setReachedEnd(allVenues.length === totalCount);
  };

  const sections = useMemo(
    () =>
      venues.map((venue, index) => ({
        venue,
        title: venue.name,
        filter: {
          venue: venue.id,
          ...(dateFilter
            ? { dateFrom: dateFilter[0], dateTo: dateFilter[1] }
            : {}),
        },
        preloaded: !dateFilterChanged ? preloadedEvents[index] : {},
      })),
    [venues, dateFilter]
  );

  const renderSection = ({ venue, filter, preloaded = {} }) => (
    <div className="container">
      <div className="venue">
        <VenueSlider
          imgWidths={[600, 1000, 2000]}
          imgSizes="(min-width: 960px) calc(960px - 4em), calc(100vw - 4em)"
          routeParams={routeParams}
          venue={venue}
        />
      </div>
      <EventRow
        filter={filter}
        routeParams={routeParams}
        events={preloaded.results}
        totalCount={preloaded.totalCount}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: grid;
          grid-gap: ${dimensions.gridGap.L};
          grid-template-rows: 213px auto;
          grid-template-columns: 100%;
          border-radius: ${dimensions.tileRadius};
        }
        .venue {
          border-radius: ${dimensions.tileRadius};
          overflow: hidden;
        }
      `}</style>
    </div>
  );

  return (
    <main>
      <h1>{__('ExploreVenuesPage.title', { city: cityName })}</h1>
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
        fetchSectionsCb={loadVenues}
        reachedEnd={reachedEnd}
      />
    </main>
  );
}

ExploreVenuesPage.getInitialProps = async ({ query }) => {
  const { dateFrom, dateTo, pageSlug } = query;
  const listings = getConfig(pageSlug);
  const { VENUES } = listings;

  const preloadedVenues = (await getVenues({
    limit: VENUES.length,
    query: { ids: VENUES },
    sortBy: '_id',
  })).results
    // Sort by venue order
    .sort((a, b) => {
      const indexA = VENUES.indexOf(a.id);
      const indexB = VENUES.indexOf(b.id);
      if (indexA === indexB) return 0;
      return indexA > indexB ? 1 : -1;
    });

  const preloadedEvents = await Promise.all(
    VENUES.slice(0, 4).map(venueId =>
      getEvents({
        limit: 8,
        query: {
          pageSlug: pageSlug,
          venue: venueId,
          dateFrom,
          dateTo,
        },
      })
    )
  );

  return {
    listings,
    preloadedVenues,
    preloadedEvents,
  };
};

const getBreadcrumbs = () => [{ key: 'exploreVenues' }];

export default withPageLayout({ getBreadcrumbs })(ExploreVenuesPage);
