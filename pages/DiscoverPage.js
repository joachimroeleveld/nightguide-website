import Head from 'next/head';
import moment from 'moment-timezone';
import css from 'styled-jsx/css';

import withPageLayout from '../components/PageLayout';
import __, { __city } from '../lib/i18n';
import React from 'react';
import EventRow from '../components/events/EventRow';
import { SORT_POPULARITY } from '../components/events/util';
import { getVenues, getEvents, getConfigByName, getContent } from '../lib/api';
import { Link } from '../routes';
import VenueRow from '../components/venues/VenueRow';
import EventTile from '../components/events/EventTile';
import dimensions from '../styles/dimensions';
import CityMenu from '../components/CityMenu';
import SeeAllButton from '../components/SeeAllButton';
import ArticleGrid from '../components/articles/ArticleGrid';
import TitleWithImage from '../components/TitleWithImage';

function DiscoverPage(props) {
  const {
    pageSlug,
    popularEvents,
    popularLocations,
    routeParams,
    sponsoredEvent,
    headerImage,
    recentArticles,
    genreEvents,
    genres,
  } = props;

  const cityName = __city(pageSlug)('name');

  return (
    <main>
      <Head>
        <title>{__('DiscoverPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('DiscoverPage.meta.description', { city: cityName })}
        />
        {headerImage && (
          <meta property="og:image" content={`${headerImage}=s1200`} />
        )}
      </Head>

      <div className="menu">
        <CityMenu pageSlug={pageSlug} routeParams={routeParams} />
      </div>

      {popularEvents && (
        <section>
          <h2>{__('DiscoverPage.popular')}</h2>
          <EventRow events={popularEvents} routeParams={routeParams} />
          <Link route="events" params={routeParams}>
            <SeeAllButton title={__('DiscoverPage.allEvents')} />
          </Link>
        </section>
      )}

      <div className="locations-sponsored">
        {popularLocations && (
          <section className="popular-locations">
            <h2>{__('DiscoverPage.popularLocations')}</h2>
            <VenueRow venues={popularLocations} routeParams={routeParams} />
          </section>
        )}

        {sponsoredEvent && (
          <section className="sponsored-event">
            <h2>{__('DiscoverPage.recommended')}</h2>
            <EventTile
              wideQuery={'(min-width: 25em)'}
              routeParams={routeParams}
              imgWidths={[300, 600, 900, 2000]}
              imgSizes={`(max-width: 50em) calc(100vw - 2 * ${
                dimensions.bodyPadding
              }), 215px`}
              event={sponsoredEvent}
            />
          </section>
        )}
      </div>

      {!!recentArticles.length && (
        <section>
          <h2>{__('DiscoverPage.recentArticles')}</h2>
          <ArticleGrid articles={recentArticles} routeParams={routeParams} />
        </section>
      )}

      {genres &&
        genres.map((genre, index) => {
          const { name } = genre;
          const events = genreEvents[index];
          const seeAllParams = {
            ...routeParams,
            'genres[0]': name,
          };
          if (!events.length) return null;
          return (
            <section key={name}>
              <h2>{name}</h2>
              <EventRow
                events={events}
                routeParams={routeParams}
                seeAllParams={seeAllParams}
              />
              <Link route="events" params={seeAllParams}>
                <SeeAllButton
                  title={__('DiscoverPage.allFromGenre', { genre: name })}
                />
              </Link>
            </section>
          );
        })}

      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 1.2em 0 0;
          line-height: 1.6;
          box-shadow: 0 0 0.35em rgba(0, 0, 0, 0.6);
        }
        section {
          margin: 2.5em 0;
        }
        .menu + section {
          margin-top: 2em;
        }
        .menu {
          margin: 1em 0 4em;
        }
        @media (max-width: 800px) {
          .menu {
            display: none;
          }
        }
        @media (min-width: 800px) {
          section {
            margin: 4em 0;
          }
          .locations-sponsored {
            margin: -4em 0;
            display: grid;
            grid-template-columns: repeat(
              2,
              calc(50% - ${dimensions.gridGap.L} / 2)
            );
            grid-gap: ${dimensions.gridGap.L};
            grid-template-areas: 'a b';
          }
          .sponsored-event {
            grid-area: b;
          }
          .popular-locations {
            padding-right: 3em;
          }
        }
      `}</style>
    </main>
  );
}

DiscoverPage.getInitialProps = async ctx => {
  const { pageSlug } = ctx.query;

  const config = await getConfigByName('page_city', pageSlug);
  const {
    sponsoredEvent: sponsoredEventId,
    popularLocations: popularLocationIds,
    headerImage,
  } = config.payload || {};
  const eventsConfig = await getConfigByName('page_events', pageSlug);
  const genres = (eventsConfig.payload || {}).genreFilters;

  const getEventsRow = async filter =>
    (await getEvents({
      limit: 4,
      query: {
        pageSlug,
        ...filter,
      },
    })).results;

  const popularEvents = await getEventsRow({
    sortBy: SORT_POPULARITY,
    dateTo: moment()
      .add(7, 'days')
      .toISOString(),
  });

  let sponsoredEvent;
  if (sponsoredEventId) {
    sponsoredEvent = (await getEventsRow({ ids: [sponsoredEventId] }))[0];
  }

  let popularLocations;
  if (popularLocationIds) {
    popularLocations = (await getVenues({
      query: {
        ids: popularLocationIds,
      },
    })).results;
    popularLocations.sort((a, b) => {
      return (
        popularLocationIds.indexOf(a.id) - popularLocationIds.indexOf(b.id)
      );
    });
  }

  let genreEvents;
  if (genres) {
    genreEvents = await Promise.all(
      genres.map(
        async ({ tags }) =>
          (await getEvents({
            query: { pageSlug, tags },
          })).results
      )
    );
  }

  const recentArticles = (await getContent({
    limit: 4,
    query: { pageSlug },
  })).results;

  return {
    headerImage,
    sponsoredEvent,
    popularEvents,
    popularLocations,
    recentArticles,
    genres,
    genreEvents,
  };
};

export default withPageLayout({
  TitleComponent: props => {
    const { pageSlug, headerImage } = props;
    const cityName = __city(pageSlug)('name');
    return (
      <TitleWithImage
        imgSrc={headerImage}
        title={cityName}
        blurImage={false}
        titleFontSize={'3.75em'}
        height={'20em'}
        /*language=CSS*/
        {...css.resolve`
          @media (max-width: 800px) {
            :global(h1) {
              font-size: 2.2em !important;
            }
            .container {
              height: 300px !important;
            }
          }
          @media (min-width: 800px) {
            :global(h1) {
              font-size: 3.75em !important;
            }
            .container {
              height: 30vh !important;
            }
          }
        `}
      />
    );
  },
})(DiscoverPage);
