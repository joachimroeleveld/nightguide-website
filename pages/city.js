import Head from 'next/head';
import moment from 'moment-timezone';

import withPageLayout from '../components/PageLayout';
import __, { __city } from '../lib/i18n';
import React from 'react';
import EventRow from '../components/events/EventRow';
import { SORT_POPULARITY } from '../components/events/util';
import { getVenues, getEvents, getEvent, getConfigByName } from '../lib/api';
import { Link } from '../routes';
import VenueRow from '../components/venues/VenueRow';
import EventTile from '../components/events/EventTile';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import CityMenu from '../components/CityMenu';
import { withNavigation } from '../components/Navigation';

function CityPage(props) {
  const {
    pageSlug,
    popularEvents,
    popularLocations,
    routeParams,
    sponsoredEvent,
  } = props;

  const cityName = __city(pageSlug)('name');

  return (
    <main>
      <Head>
        <title>{__('cityPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('cityPage.meta.description', { city: cityName })}
        />
      </Head>

      <div className="menu">
        <CityMenu pageSlug={pageSlug} routeParams={routeParams} />
      </div>

      {popularEvents && (
        <section>
          <h2>{__('cityPage.popular')}</h2>
          <EventRow events={popularEvents} routeParams={routeParams} />
        </section>
      )}

      <Link route="events" params={routeParams}>
        <a className="all-events">{__('cityPage.allEvents')}</a>
      </Link>

      <div className="grid-2">
        {sponsoredEvent && (
          <section className="grid-area-b">
            <h2>{__('cityPage.recommended')}</h2>
            <EventTile
              wideQuery={'(min-width: 25em)'}
              routeParams={routeParams}
              event={sponsoredEvent}
            />
          </section>
        )}

        {popularLocations && (
          <section className="popular-locations grid-area-a">
            <h2>{__('cityPage.popularLocations')}</h2>
            <VenueRow venues={popularLocations} routeParams={routeParams} />
          </section>
        )}
      </div>

      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 1.2em 0;
          line-height: 1.6;
        }
        section {
          margin: 2em 0;
        }
        .menu {
          margin: 2em 0 4em;
        }
        @media (max-width: 800px) {
          .menu {
            display: none;
          }
          .all-events {
            display: block;
            border: 2px solid #686868;
            padding: 0.5em 2em;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            border-radius: 3px;
            margin: 1em 0 0;
          }
        }
        @media (min-width: 800px) {
          .grid-2 {
            display: grid;
            grid-template-columns: repeat(
              2,
              calc(50% - ${dimensions.gridGap.L} / 2)
            );
            grid-gap: ${dimensions.gridGap.L};
            grid-template-areas: 'a b';
          }
          .grid-area-a {
            grid-area: a;
          }
          .grid-area-b {
            grid-area: b;
          }
          .popular-locations {
            padding-right: 3em;
          }
          .all-events {
            display: block;
            color: ${colors.linkText};
            background: url(/static/img/see-all-button.svg) no-repeat left
              center;
            padding-left: 0.8em;
            margin: 1em 0;
          }
        }
      `}</style>
    </main>
  );
}

CityPage.getInitialProps = async ctx => {
  const { pageSlug } = ctx.query;

  const config = await getConfigByName('homepage', pageSlug);
  const {
    sponsoredEvent: sponsoredEventId,
    popularLocations: popularLocationIds,
    headerImage,
  } = config.payload;

  const getEventsRow = async filter =>
    (await getEvents({
      limit: 4,
      query: {
        pageSlug,
        tagged: true,
        ...filter,
      },
    })).results;

  const popularEvents = await getEventsRow({
    sortBy: SORT_POPULARITY,
    dateFrom: moment().toISOString(),
    dateTo: moment()
      .add(7, 'days')
      .toISOString(),
  });

  let sponsoredEvent;
  if (sponsoredEventId) {
    sponsoredEvent = await getEvent(sponsoredEventId);
  }

  let popularLocations;
  if (popularLocationIds) {
    popularLocations = (await getVenues({
      query: {
        ids: popularLocationIds,
      },
    })).results;
  }

  return {
    headerImage,
    sponsoredEvent,
    popularEvents,
    popularLocations,
  };
};

// Use HOC to get access to page slug to supply it to withPageLayout() call
function CityPageHoc(props) {
  const { pageSlug, headerImage } = props;

  const Page = withPageLayout({
    title: __city(pageSlug)('name'),
    subtitle: __city(pageSlug)('subtitle'),
    headerImage: headerImage,
  })(CityPage);

  return <Page {...props} />;
}

CityPageHoc.getInitialProps = CityPage.getInitialProps;

export default withNavigation(CityPageHoc);
