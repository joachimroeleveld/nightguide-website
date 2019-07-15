import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment-timezone';
import memoize from 'lodash/memoize';
import range from 'lodash/range';
import debounce from 'lodash/debounce';
import findIndex from 'lodash/findIndex';
import Observer from '@researchgate/react-intersection-observer';
import css from 'styled-jsx/css';

import { getEvents, getVenues } from '../../lib/api';
import withPageLayout from '../../components/PageLayout';
import __, { __city } from '../../lib/i18n';
import colors from '../../styles/colors';
import EventDateFilterBar from '../../components/events/EventDateFilterBar';
import EventRow from '../../components/events/EventRow';
import SectionHeader from '../../components/SectionHeader';
import VenueSliderTile from '../../components/venues/VenueSliderTile';
import dimensions from '../../styles/dimensions';
import ResponsiveImage from '../../components/ResponsiveImage';
import Spinner from '../../components/Spinner';

const VENUE_SECTION_ORDER =
  process.env.NODE_ENV === 'production'
    ? [
        '5d1affe8bd44b9001205a73d', // Pacha
        '5d1affd9bd44b9001205a736', // Ushuaia
        '5d1affb9bd44b9001205a726', // Hi
        '5d1affd3bd44b9001205a733', // Amnesia
        '5d1affc3bd44b9001205a72b', // Privilege
        '5d1affadbd44b9001205a720', // Heart
        '5d1affc5bd44b9001205a72c', // Eden
        '5d1afff3bd44b9001205a743', // DC-10
        '5d1affbebd44b9001205a728', // Octan
        '5d1affeebd44b9001205a740', // Ocean Beach
        '5d1afff5bd44b9001205a744', // Destino
        '5d1affdabd44b9001205a737', // Es Paradis
        '5d1affe3bd44b9001205a73b', // Benimussa Park Ibiza
        '5d1affd5bd44b9001205a734', // Ibiza Rocks
        '5d1affd7bd44b9001205a735', // Oceanbeat pier
        '5d1afff1bd44b9001205a742', // Cova Santa
        '5d1affddbd44b9001205a738', // Las Dalias
        '5d1a2d82bd44b9001205a71c', // Pikes
        '5d1affc9bd44b9001205a72e', // Boat club
        '5d1affd1bd44b9001205a732', // Ibiza Underground
        '5d1affb5bd44b9001205a724', // Blue Marlin
      ]
    : ['5d19f08392e71d392c5ddba1', '5d19f04e92e71d392c5ddb95'];

const getPreloadSections = () => {
  const dow = moment().day();

  const sections = [
    // Today
    {
      title: __('today'),
      filter: {
        dateTo: moment({ hour: 23, minute: 59 }).toDate(),
      },
    },
  ];

  if (dow !== 5) {
    sections.push({
      // Tomorrow
      title: __('tomorrow'),
      filter: {
        dateFrom: moment({ hour: 0, minute: 0 })
          .add(1, 'days')
          .toDate(),
        dateTo: moment({ hour: 23, minute: 59 })
          .add(1, 'days')
          .toDate(),
      },
    });
  }

  if (![6, 7, 0].includes(dow)) {
    // This weekend
    sections.push({
      title: __('thisWeekend'),
      filter: {
        dateFrom: moment(
          dow === 5 ? { hour: 0, minute: 0 } : { hour: 15, minute: 0 }
        )
          .day(dow === 5 ? 6 : 5)
          .toDate(),
        dateTo: moment({ hour: 23, minute: 59 })
          .day(7)
          .subtract(dow === 0 ? 1 : 0, 'week')
          .toDate(),
      },
    });
  }

  return sections;
};

const SORT_DATE = 'date.from:asc,_id';
const SORT_POPULARITY = 'date.interestedCount:desc,' + SORT_DATE;

function IbizaCityPage(props) {
  const {
    pageSlug,
    routeParams,
    preloadedSections,
    preloadedEvents,
    preloadedVenues,
  } = props;

  const [dateFilter, setDateFilter] = useState(null);
  const [venues, setVenues] = useState(preloadedVenues);
  const [fetchingVenues, setFetchingVenues] = useState(false);
  const [windowWidth, setWindowWidth] = useState(false);
  const [loadedSections, setLoadedSections] = useState(
    range(0, preloadedSections.length)
  );

  const cityName = __city(pageSlug)('name');

  // Reset loaded sections after date filter
  useEffect(() => {
    setLoadedSections(range(0, preloadedSections.length));
  }, [dateFilter]);

  useEffect(() => {
    const resizeListener = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100);
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const dateSections = useMemo(() => {
    const sections = [];

    // No date applied
    if (!dateFilter) {
      sections.push(
        ...preloadedSections.map((section, index) => ({
          preloadedEvents: preloadedEvents[index],
          ...section,
        }))
      );
    }

    // Date filter applied
    if (dateFilter) {
      const dateFrom = moment(dateFilter[0]);
      const amountDays = Math.abs(dateFrom.diff(dateFilter[1], 'days')) + 1;

      // If not today/tomorrow and not more than 3 days
      if (amountDays <= 3) {
        const daySections = range(0, amountDays).map(day => {
          // Localized form of day and month
          const date = moment(dateFrom).add(day, 'days');
          return {
            title: date
              .format('LL')
              .match(/^(\w+ \w+)/)
              .pop(),
            filter: {
              dateFrom: date.toDate(),
              dateTo: moment(date)
                .set({ hour: 23, minute: 59 })
                .toDate(),
            },
          };
        });
        sections.push(...daySections);
      }
    }

    return sections;
  }, [dateFilter]);

  const loadVenues = async () => {
    if (fetchingVenues) return;
    setFetchingVenues(true);
    const result = await getVenues({
      limit: VENUE_SECTION_ORDER.length,
      offset: venues.length,
      query: { pageSlug, sortBy: 'name:asc,_id', exclude: VENUE_SECTION_ORDER },
    });
    setFetchingVenues(false);
    setVenues(venues.concat(result.results));
    return result.results;
  };

  const sections = useMemo(() => {
    const venueSections = venues.map(venue => ({
      title: venue.name,
      venue,
      filter: { venue: venue.id },
    }));
    const availableSections = [...dateSections, ...venueSections];
    if (loadedSections.length >= availableSections.length) {
      loadVenues();
    }
    return availableSections.slice(0, loadedSections.length);
  }, [dateFilter, venues, loadedSections]);

  const getSectionFilter = useMemo(
    () =>
      memoize(index => {
        const filter = Object.assign({}, sections[index].filter);
        // Apply date filter
        if (dateFilter && !filter.dateFrom) {
          filter.dateFrom = moment(dateFilter[0]).toDate();
          filter.dateTo = moment(dateFilter[1]).toDate();
        }
        // Apply max dates for sections without day filter
        if (!filter.dateTo) {
          filter.dateTo = moment()
            .add(1, 'week')
            .toDate();
        }
        return {
          ...filter,
          pageSlug,
        };
      }),
    [sections]
  );

  const getAddSection = memoize(index => ({ isIntersecting }) => {
    if (isIntersecting && index === loadedSections.length - 1) {
      setLoadedSections(range(0, index + 2));
    }
  });

  // console.log('sections', sections);
  // console.log('loadedSections', loadedSections);
  // console.log('venues', venues);
  // console.log('fetchingVenues', fetchingVenues);
  // console.log('=========');

  return (
    <main>
      <Head>
        <title>{__city(pageSlug)('meta.title')}</title>
        <meta
          name="description"
          content={__city(pageSlug)('meta.description')}
        />
      </Head>

      <header className="header">
        <h1>{__('cityEventsPage.eventsInCity', { city: cityName })}</h1>
        <div className="img">
          <ResponsiveImage
            url="https://lh3.googleusercontent.com/JIvV5nfuJZUffg1SxB2Ibn_1YE0ovrX_1yH32cjuONue7maTtVZ6mAqDVq0uZGN3I0SKgcbI8d0p9k16wDp73I7w0NCJoUAfKg"
            widths={[300, 600, 1000, 2000]}
            sizes="(max-width: 800px) 100vw, 960px"
            /*language=CSS*/
            {...css.resolve`
              .container {
                display: block;
                width: 100%;  
                height: 100%;
              }
              img {
                object-fit: cover;
                width: 100%;
                height: 100%;
              }
            `}
          />
        </div>
      </header>
      <div className="filter">
        <EventDateFilterBar onChange={setDateFilter} />
      </div>
      {sections.slice(0, loadedSections.length).map((section, sectionIndex) => {
        const { preloadedEvents, venue, title } = section;

        const isFirstVenueSection =
          findIndex(sections, section => section.venue) === sectionIndex;

        const filter = getSectionFilter(sectionIndex);

        return (
          <section
            className={[
              'event-section',
              venue ? 'venue-section' : '',
              isFirstVenueSection ? 'first-venue' : '',
            ].join(' ')}
            key={JSON.stringify(dateFilter) + sectionIndex}
          >
            {isFirstVenueSection && (
              <SectionHeader
                title={__('cityEventsPage.clubs')}
                TitleElem={'h2'}
              />
            )}
            {!venue && <SectionHeader title={title} TitleElem={'h2'} />}
            <div className="content">
              {venue && (
                <div className="venue">
                  <VenueSliderTile
                    imgWidths={[600, 1000, 2000]}
                    imgSizes="(min-width: 800px) calc(50vw - 2em - 7px), calc(100vw - 4em)"
                    routeParams={routeParams}
                    venue={venue}
                  />
                </div>
              )}
              <div className="row">
                <EventRow
                  rowCount={venue ? (windowWidth > 800 ? 2 : 1) : 1}
                  filter={filter}
                  routeParams={routeParams}
                  initialEvents={preloadedEvents && preloadedEvents.results}
                  reachedEnd={
                    preloadedEvents &&
                    preloadedEvents.results.length ===
                      preloadedEvents.totalCount
                  }
                  sortBy={!venue ? SORT_POPULARITY : SORT_DATE}
                />
              </div>
            </div>
            <Observer onChange={getAddSection(sectionIndex)} treshold={0.25}>
              <div />
            </Observer>
          </section>
        );
      })}
      {fetchingVenues && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .header {
          height: 300px;
          margin: 0 -2em 1em;
          display: flex;
          align-items: flex-end;
          position: relative;
        }
        .header h1 {
          position: relative;
          z-index: 1;
          width: 100%;
          margin: 0;
          padding: 3em 2rem 1em;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.9) 100%
          );
        }
        .header .img {
          z-index: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        }
        .filter {
          margin-bottom: 2em;
        }
        .event-section:not(:first-of-type) {
          margin-top: 2em;
        }
        .venue-section .content {
          display: grid;
          grid-gap: ${dimensions.gridGap};
          grid-template-rows: 15em auto;
          grid-template-columns: 100%;
        }
        .venue-section:not(.first-venue) .content {
          border-top: 1px solid ${colors.separator};
          padding-top: 3em;
          margin-top: 4em;
        }
        .spinner {
          display: flex;
          justify-content: center;
          margin-top: 4em;
        }
        @media (min-width: 800px) {
          .header {
            height: 30vh;
          }
          .event-section.venue-section .content {
            display: grid;
            grid-gap: ${dimensions.gridGap};
            grid-template-columns: repeat(2, calc(50% - 7px));
            grid-template-rows: auto;
          }
          .event-section .venue {
            height: 448px;
          }
          .event-section .row {
            height: 100%;
          }
        }
      `}</style>
    </main>
  );
}

IbizaCityPage.getInitialProps = async () => {
  const preloadedSections = getPreloadSections();

  const preloadedEvents = await Promise.all(
    preloadedSections.map(
      async ({ filter }) =>
        await getEvents({
          sortBy: SORT_POPULARITY,
          limit: 8,
          query: {
            pageSlug: 'es/ibiza',
            ...filter,
          },
        })
    )
  );
  const preloadedVenues = (await getVenues({
    query: { ids: VENUE_SECTION_ORDER },
  })).results
    // Sort by venue order
    .sort((a, b) => {
      const indexA = VENUE_SECTION_ORDER.indexOf(a.id);
      const indexB = VENUE_SECTION_ORDER.indexOf(b.id);
      if (indexA === indexB) return 0;
      return indexA > indexB ? 1 : -1;
    });

  return {
    preloadedEvents,
    preloadedVenues,
    preloadedSections,
  };
};

export default withPageLayout()(IbizaCityPage);
