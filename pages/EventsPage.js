import Head from 'next/head';
import { useState, useEffect, useRef, useMemo } from 'react';
import pick from 'lodash/pick';
import qs from 'qs';

import { setUrlParams } from '../lib/routing';
import withPageLayout from '../components/PageLayout';
import {
  getArtist,
  getConfigByName,
  getEvents,
  getTags,
  getVenue,
} from '../lib/api';
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
    tags = [],
  } = props;
  const query = useMemo(() => parseQuery(props.query), [props.query]);
  const {
    dateFrom,
    dateTo,
    tags: tagIds,
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
    tagIds && tagIds.length,
    venueId,
    artistId,
  ]);

  // Update state if query param changes
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Load new items if page changes
  useEffect(() => {
    if (!events[currentPage]) {
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
      const newEvents = await getEventPage({
        query,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });

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
              tags: tagIds,
              artist: artistId,
              venue: venueId,
            }}
            venue={venue}
            artist={artist}
            tags={tags}
            onChange={onFiltersChange}
            pageSlug={pageSlug}
          />
        </div>

        <div className="event-container">
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
              {currentPage !== 1 && (
                <a
                  className="button prev"
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
              <span className="page-count">{`${currentPage}/${pageCount}`}</span>
              {pageCount !== currentPage && (
                <a
                  className="button next"
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
          )}

          {loading && (
            <div className="spinner">
              <Spinner />
            </div>
          )}

          {totalCount === 0 && (
            <div className="empty-message">{__('EventsPage.noEvents')}</div>
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
        .empty-message {
          margin-top: -1em;
          color: ${colors.textSecondary};
        }
        .pager {
          display: flex;
          align-items: center;
        }
        .pager .page-count {
          text-align: center;
          flex-grow: 1;
        }
        .pager .spacer {
          flex-grow: 1;
        }
        .pager .button {
          width: 4.5em;
          height: 2.2em;
          background: url(/static/img/events-pager-button.svg) no-repeat center
            center;
          background-size: cover;
        }
        .pager .button.next {
          transform: rotateY(180deg);
        }
        .spinner {
          display: flex;
          justify-content: center;
        }
        .pager,
        .spinner {
          margin: 2em 0 0;
        }
        .menu {
          margin: 2em 0 1.5em;
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

function getEventPage({ query = {}, ...otherOpts }) {
  return getEvents({
    query: pick(query, [
      'pageSlug',
      'dateFrom',
      'dateTo',
      'artist',
      'venue',
      'tags',
    ]),
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
    'tags',
  ]);
}

Events.getInitialProps = async ctx => {
  const query = parseQuery(ctx.query);
  const { page = 1, pageSlug } = query;

  const associatedProps = await getSearchSubjects(query);
  const config = await getConfigByName('page_events', pageSlug);
  const { genres } = config.payload || {};

  let tags;
  if (genres) {
    tags = (await getTags({
      query: { ids: genres },
    })).results;
  }

  return {
    ...associatedProps,
    tags,
    events: await getEventPage({
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
      query,
    }),
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
