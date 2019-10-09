import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import pick from 'lodash/pick';
import qs from 'qs';
import flatten from 'lodash/flatten';
import find from 'lodash/find';

import { setUrlParams } from '../lib/routing';
import withPageLayout from '../components/PageLayout';
import { getArtist, getConfigByName, getEvents, getVenue } from '../lib/api';
import __, { __city } from '../lib/i18n';
import colors from '../styles/colors';
import EventTile from '../components/events/EventTile';
import { useEffectSkipFirst } from '../lib/hooks';
import dimensions from '../styles/dimensions';
import Spinner from '../components/Spinner';
import EventFilters from '../components/events/EventFilters';
import CityMenu from '../components/CityMenu';

const ITEMS_PER_PAGE = 10;

function Events(props) {
  const {
    pageSlug,
    currentUrl,
    events: initialEvents,
    routeParams,
    genreFilters = [],
  } = props;
  const query = useMemo(() => parseQuery(props.query), [props.query]);
  const {
    dateFrom,
    dateTo,
    genres: genres,
    venue: venueId,
    artist: artistId,
    dateFilterId,
    page = 1,
  } = query;

  const previousFilters = useRef(query);
  const [events, setEvents] = useState({
    [`p${page}`]: initialEvents.results,
  });
  const [totalCount, setTotalCount] = useState(initialEvents.totalCount);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchSubjects, setSearchSubjects] = useState({
    venue: props.venue,
    artist: props.artist,
  });
  const { venue, artist } = searchSubjects;

  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffectSkipFirst(() => {
    previousFilters.current = query;
    resetContent();
    resetScroll();
  }, [
    dateFrom && dateFrom.getTime(),
    dateTo && dateTo.getTime(),
    genres && genres.length,
    venueId,
    artistId,
  ]);

  // Update state if query param changes
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Load new items if page changes
  useEffect(() => {
    if (!events[`p${currentPage}`]) {
      loadCurrentPage();
    }
  }, [currentPage, events]);

  useEffectSkipFirst(() => {
    resetScroll();
  }, [currentPage]);

  const loadCurrentPage = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const newEvents = await getEventPage(
        {
          query,
          offset: (currentPage - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
        },
        genreFilters
      );

      setEvents({
        ...events,
        [`p${currentPage}`]: newEvents.results,
      });
      setTotalCount(newEvents.totalCount);
    } finally {
      setLoading(false);
    }
  };

  const cityName = __(`city.${pageSlug}.name`);

  const changePage = newPage => {
    if (newPage === 0 || newPage > pageCount) return;

    setCurrentPage(newPage);
    setUrlParams({ page: newPage === 1 ? null : newPage });
  };

  const resetContent = async () => {
    const searchSubjects = await getSearchSubjects(query);
    setSearchSubjects(searchSubjects);
    setEvents({});
    changePage(1);
    loadCurrentPage();
  };

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onFiltersChange = filters => {
    const urlParams = Object.keys(filters).reduce(
      (acc, key) => ({
        ...acc,
        [key]: filters[key] || null,
      }),
      {}
    );
    setUrlParams(urlParams);
  };

  const visibleEvents = events[`p${currentPage}`] || [];

  return (
    <main>
      <Head>
        <title>{__('EventsPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('EventsPage.meta.description', { city: cityName })}
        />
      </Head>

      <div className="menu">
        <CityMenu pageSlug={pageSlug} routeParams={routeParams} />
      </div>

      <div className="columns">
        <div className="filters">
          <EventFilters
            values={{
              dateFilterId,
              dateFrom,
              dateTo,
              genres,
              artist: artistId,
              venue: venueId,
            }}
            venue={venue}
            artist={artist}
            genres={genreFilters}
            onChange={onFiltersChange}
            pageSlug={pageSlug}
          />
        </div>

        <div className="event-container">
          <div className="event-count">
            {__('EventsPage.nEventsFound', { n: totalCount })}
          </div>
          <div className="events" id="events">
            {visibleEvents.map(event => (
              <EventTile
                routeParams={routeParams}
                key={event.id + event.dateIndex}
                event={event}
                wideQuery="(min-width: 50em)"
                imgWidths={[300, 600, 900, 2000]}
                imgSizes={`(max-width: 50em) calc(100vw - 2 * ${
                  dimensions.bodyPadding
                }), 215px`}
              />
            ))}
          </div>

          {totalCount !== 0 && (
            <div className="pager">
              <div className="prev">
                {currentPage !== 1 && (
                  <a
                    className="button"
                    rel="prev"
                    href={`${currentUrl}${qs.stringify(
                      {
                        ...getUrlQueryParams(query),
                        page: page === 2 ? undefined : page - 1,
                      },
                      { addQueryPrefix: true }
                    )}`}
                    onClick={e => {
                      e.preventDefault();
                      changePage(currentPage - 1);
                    }}
                  />
                )}
              </div>
              {loading && (
                <div className="spinner">
                  <Spinner />
                </div>
              )}
              {!loading && (
                <span className="page-count">
                  {`${currentPage}/${pageCount}`}
                </span>
              )}
              <div className="next">
                {pageCount !== currentPage && (
                  <a
                    className="button"
                    rel="next"
                    href={`${currentUrl}${qs.stringify(
                      {
                        ...getUrlQueryParams(query),
                        page: page + 1,
                      },
                      { addQueryPrefix: true }
                    )}`}
                    onClick={e => {
                      e.preventDefault();
                      changePage(currentPage + 1);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/*language=CSS*/}
      <style jsx>{`
        .events {
          margin-top: 2em;
          display: grid;
          grid-template-columns: 100%;
          grid-gap: ${dimensions.gridGap.S};
        }
        .filter {
          margin-bottom: 4em;
        }
        .pager {
          display: flex;
          align-items: center;
        }
        .pager .page-count,
        .spinner {
          display: flex;
          justify-content: center;
          flex-grow: 1;
        }
        .pager .spacer {
          flex-grow: 1;
        }
        .pager .next,
        .pager .prev {
          width: 4.5em;
        }
        .pager .button {
          display: block;
          width: 100%;
          height: 2.2em;
          background: url(/static/img/events-pager-button.svg) no-repeat center
            center;
          background-size: cover;
        }
        .pager .next .button {
          transform: rotateY(180deg);
        }
        .pager {
          margin: 2em 0 0;
        }
        .menu {
          margin: 2em 0 1.5em;
        }
        .event-count {
          color: ${colors.textSecondary};
          font-size: 0.9em;
          margin: 1.5em 0 -0.4em;
        }
        @media (max-width: 800px) {
          .filters {
            margin: -0.6em 0 0;
          }
          .menu {
            display: none;
          }
        }
        @media (min-width: 800px) {
          .events {
            grid-gap: ${dimensions.gridGap.L};
          }
          .filters {
            padding-right: 3em;
          }
          .columns {
            display: grid;
            grid-template-columns: 2fr 5fr;
          }
        }
      `}</style>
    </main>
  );
}

async function getSearchSubjects(query) {
  const { venue: venueId, artist: artistId } = query;
  let venue, artist;
  if (venueId) {
    venue = await getVenue(venueId);
  }
  if (artistId) {
    artist = await getArtist(artistId);
  }
  return { venue, artist };
}

function getEventPage({ query = {}, ...otherOpts }, genreFilters) {
  const { pageSlug, dateFrom, dateTo, artist, venue, genres } = query;

  let tags;
  if (genres) {
    tags = flatten(
      genres.map(
        name => find(genreFilters, filter => filter.name === name).tags
      )
    );
  }

  return getEvents({
    query: {
      pageSlug,
      dateFrom,
      dateTo,
      artist,
      venue,
      tags,
    },
    serialize: false,
    ...otherOpts,
  });
}

function getUrlQueryParams(query) {
  return pick(query, [
    'page',
    'dateFilterId',
    'dateFrom',
    'dateTo',
    'artist',
    'venue',
    'genres',
  ]);
}

Events.getInitialProps = async ctx => {
  const query = parseQuery(ctx.query);
  const { page = 1, pageSlug } = query;

  const associatedProps = await getSearchSubjects(query);
  const config = await getConfigByName('page_events', pageSlug);
  const genreFilters = (config.payload || {}).genreFilters;

  return {
    ...associatedProps,
    genreFilters,
    events: await getEventPage(
      {
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
        query,
      },
      genreFilters
    ),
  };
};

const parseQuery = ({ dateFrom, dateTo, page, ...query }) => ({
  ...qs.parse(query),
  page: page ? parseInt(page) : undefined,
  dateFrom: dateFrom ? new Date(dateFrom) : undefined,
  dateTo: dateTo ? new Date(dateTo) : undefined,
});

const breadcrumbs = () => [{ key: 'events' }];

export default withPageLayout({
  meta: ({ query, currentUrl }) => ({
    canonical:
      currentUrl +
      qs.stringify(getUrlQueryParams(query), { addQueryPrefix: true }),
  }),
  breadcrumbs,
  title: ({ pageSlug }) =>
    __('EventsPage.title', { city: __city(pageSlug)('name') }),
})(Events);
