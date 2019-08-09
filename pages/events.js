import Head from 'next/head';
import { useState, useEffect } from 'react';
import pick from 'lodash/pick';

import { reload } from '../lib/routing';
import withPageLayout from '../components/PageLayout';
import { getArtist, getEvents, getVenue } from '../lib/api';
import __ from '../lib/i18n';
import EventGrid from '../components/events/EventGrid';
import { getListings } from './cities';
import EventDateFilterBar from '../components/events/EventDateFilterBar';
import { useDateFilter } from '../components/events/hooks';
import colors from '../styles/colors';

function EventsPage(props) {
  const { pageSlug, title, query, events: initialEvents, routeParams } = props;

  const [events, setEvents] = useState(initialEvents);

  const { setDateFilter, dateFilterId, dateFilter } = useDateFilter(
    query,
    props
  );

  // Reload page if essential query params change
  useEffect(() => {
    if (
      query.venue !== props.venueId ||
      query.area !== props.areaId ||
      query.artist !== props.artistId
    ) {
      reload();
    }
  }, [query]);

  // Update events if date filter changes
  useEffect(() => {
    (async () => {
      const events = await getEventPage({ query });
      setEvents(events);
    })();
  }, [query]);

  const getItems = async (offset, limit) => {
    return (await getEventPage({ query, offset, limit })).results;
  };

  const cityName = __(`city.${pageSlug}.name`);

  return (
    <main>
      <Head>
        <title>{__('EventsPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('EventsPage.meta.description', { city: cityName })}
        />
      </Head>

      <h1>
        {!title && (
          <span>
            {' '}
            {__('EventsPage.titles.eventsInCity', { city: cityName })}
          </span>
        )}
        {title}
      </h1>

      <div className="filter">
        <EventDateFilterBar
          activeButton={dateFilterId}
          startDate={dateFilter && dateFilter[0]}
          endDate={dateFilter && dateFilter[1]}
          onChange={setDateFilter}
        />
      </div>

      <EventGrid
        routeParams={routeParams}
        infinite={true}
        events={events.results}
        totalCount={events.totalCount}
        getItems={getItems}
      />

      {events.totalCount === 0 && (
        <div className="empty-message">{__('EventsPage.noEvents')}</div>
      )}

      {/*language=CSS*/}
      <style jsx>{`
        .filter {
          margin-bottom: 4em;
        }
        .empty-message {
          margin-top: -1em;
          color: ${colors.textSecondary};
        }
      `}</style>
    </main>
  );
}

async function getAssociatedProps(query, { AREAS }) {
  const { venue: venueId, artist: artistId, area: areaId } = query;
  let venue, artist, area;
  if (areaId) {
    area = AREAS[areaId];
  } else if (venueId) {
    venue = await getVenue(venueId);
  } else if (artistId) {
    artist = await getArtist(artistId);
  }
  return { venue, artist, area };
}

async function getTitle(data) {
  const { venue, artist, area } = data;
  let title;
  if (area) {
    title = __('EventsPage.titles.eventsAt', {
      location: area.name,
    });
  } else if (artist) {
    title = __('EventsPage.titles.eventsWith', {
      artist: artist.name,
    });
  } else if (venue) {
    title = __('EventsPage.titles.eventsAt', {
      location: venue.name,
    });
  }
  return title;
}

function getEventPage({ query, ...otherOpts }) {
  return getEvents({
    query: pick(query, ['pageSlug', 'dateFrom', 'dateTo', 'artist', 'venue']),
    serialize: false,
    ...otherOpts,
  });
}

EventsPage.getInitialProps = async ({ query }) => {
  const { pageSlug, venue: venueId, area: areaId, artist: artistId } = query;
  const { AREAS } = getListings(pageSlug);

  const associatedProps = await getAssociatedProps(query, { AREAS });

  return {
    venueId,
    areaId,
    artistId,
    ...associatedProps,
    title: await getTitle(associatedProps),
    events: await getEventPage({
      limit: 8,
      query,
    }),
  };
};

const getBreadcrumbs = props => {
  const { venue, artist, area } = props;

  let subLabel;
  if (venue) {
    subLabel = venue.name;
  } else if (artist) {
    subLabel = artist.name;
  } else if (area) {
    subLabel = area.name;
  }

  const breadcrumbs = [
    { key: 'events', route: subLabel ? 'events' : undefined },
  ];
  if (subLabel) {
    breadcrumbs.push({ label: subLabel });
  }
  return breadcrumbs;
};

export default withPageLayout({ getBreadcrumbs })(EventsPage);
