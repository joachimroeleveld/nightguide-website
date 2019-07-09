import Head from 'next/head';
import moment from 'moment';
import { useState, useMemo, useEffect } from 'react';
import memoize from 'lodash/memoize';
import range from 'lodash/range';
import Observer from '@researchgate/react-intersection-observer';

import { getVenues } from '../../lib/api';
import withPageLayout from '../../components/PageLayout';
import CityTitleButton from '../../components/CityTitleButton';
import __, { __city } from '../../lib/i18n';
import colors from '../../styles/colors';
import EventDateFilterBar from '../../components/events/EventDateFilterBar';
import EventRow from '../../components/events/EventRow';
import SectionHeader from '../../components/SectionHeader';
import VenueSliderTile from '../../components/venues/VenueSliderTile';
import dimensions from '../../styles/dimensions';

const VENUE_SECTION_ORDER =
  process.env.NODE_ENV === 'production'
    ? [
        '5d1affe8bd44b9001205a73d', // Pacha
        '5d1affd9bd44b9001205a736', // Ushuaia
        '5d1affd3bd44b9001205a733', // Amnesia
        '5d1affc5bd44b9001205a72c', // Eden
        '5d1affc3bd44b9001205a72b', // Privilege
        '5d1affb9bd44b9001205a726', // Hi
        '5d1afff3bd44b9001205a743', // DC-10
        '5d1affdabd44b9001205a737', // Es Paradis
        '5d1affe3bd44b9001205a73b', // Benimussa Park Ibiza
        '5d1affadbd44b9001205a720', // Heart
        '5d1affd5bd44b9001205a734', // Ibiza Rocks
        '5d1affd7bd44b9001205a735', // Oceanbeat pier
        '5d1affbebd44b9001205a728', // Octan
        '5d1a2d82bd44b9001205a71c', // Pikes
        '5d1affc0bd44b9001205a729', // Lio
      ]
    : ['5d19f08392e71d392c5ddba1', '5d19f04e92e71d392c5ddb95'];

const DOW = moment().day();
const IS_WEEKEND = moment().isAfter(
  moment()
    .subtract(DOW === 0 ? 1 : 0, 'week')
    .set({ day: 5, hour: 15, minute: 0 })
);

const TIME_SECTIONS = {
  today: {
    title: __('today'),
    filter: {
      dateTo: moment()
        .set({ hour: 23, minute: 59 })
        .toDate(),
    },
  },
  tomorrow: {
    title: __('tomorrow'),
    filter: {
      dateFrom: moment()
        .add(1, 'days')
        .set({ hour: 0, minute: 0 })
        .toDate(),
      dateTo: moment()
        .add(1, 'days')
        .set({ hour: 23, minute: 59 })
        .toDate(),
    },
  },
  weekend: {
    title: __('thisWeekend'),
    filter: {
      dateFrom: !IS_WEEKEND
        ? moment()
            .set({ day: 5, hour: 15, minute: 0 })
            .toDate()
        : new Date(),
      dateTo: moment()
        .subtract(DOW === 0 ? 1 : 0, 'week')
        .set({ day: 7, hour: 23, minute: 59 })
        .toDate(),
    },
  },
};

const INITIAL_LOADED_SECTIONS = 3;

function IbizaCityPage(props) {
  const { pageSlug, baseUrl } = props;

  const [dateFilter, setDateFilter] = useState(null);
  const [venues, setVenues] = useState([]);
  const [fetchingVenues, setFetchingVenues] = useState(false);
  const [loadedSections, setLoadedSections] = useState(
    range(0, INITIAL_LOADED_SECTIONS)
  );

  const cityName = __city(pageSlug)('name');

  useEffect(() => {
    setLoadedSections(range(0, INITIAL_LOADED_SECTIONS));
  }, [dateFilter]);

  const dateSections = useMemo(() => {
    const sections = [];

    // No date applied
    if (!dateFilter) {
      sections.push(TIME_SECTIONS['today']);
      sections.push(TIME_SECTIONS['tomorrow']);
      if (!IS_WEEKEND) sections.push(TIME_SECTIONS['weekend']);
    }

    // Date filter applied
    if (dateFilter) {
      const dateFrom = moment(dateFilter[0]).set({ hour: 0, minute: 0 });
      const amountDays = Math.abs(dateFrom.diff(dateFilter[1], 'days')) + 1;

      // If not today/tomorrow and not more than 3 days
      if (dateFrom.isAfter(moment().add(1, 'day')) && amountDays <= 3) {
        const daySections = range(0, amountDays).map(day => {
          // Localized form of day and month
          const date = moment(dateFrom).add(day, 'days');
          return {
            title: date
              .format('LL')
              .match(/^(\w+ \w+)/)
              .pop(),
            filter: {
              dateFrom: date,
              dateTo: moment(date).set({ hour: 23, minute: 59 }),
            },
          };
        });
        sections.push(...daySections);
      }
    }

    return sections;
  }, [dateFilter]);

  const sortBy = useMemo(() => {
    const dateFilterDiff =
      dateFilter && moment(dateFilter[0]).diff(dateFilter[1], 'days');
    let sortItems = [];
    if (!(dateFilter && dateFilterDiff <= 7)) {
      sortItems.push('date.interestedCount:desc');
    }
    sortItems.push('date.from');
    sortItems.push('_id');
    return sortItems.join(',');
  }, [dateFilter]);

  const loadVenues = async () => {
    if (fetchingVenues) return;
    setFetchingVenues(true);
    let result;
    if (venues.length < VENUE_SECTION_ORDER.length) {
      result = await getVenues({
        query: { ids: VENUE_SECTION_ORDER },
      });
      result.results.sort((a, b) => {
        const indexA = VENUE_SECTION_ORDER.indexOf(a.id);
        const indexB = VENUE_SECTION_ORDER.indexOf(b.id);
        if (indexA === indexB) return 0;
        return indexA > indexB ? 1 : -1;
      });
    } else {
      result = await getVenues({
        offset: venues.length,
        query: { pageSlug, sortBy: 'name', exclude: VENUE_SECTION_ORDER },
      });
    }
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
          filter.dateFrom = dateFilter[0];
          filter.dateTo = dateFilter[1];
        }
        // Apply max dates for sections without day filter
        if (!filter.dateTo) {
          filter.dateTo = moment().add(1, 'week');
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

      <h1>
        {__('cityEventsPage.eventsIn')}
        <CityTitleButton disabled={true} href={baseUrl} city={cityName} />
      </h1>
      <div className="filter">
        <EventDateFilterBar onChange={setDateFilter} />
      </div>
      {sections.slice(0, loadedSections.length).map((section, index) => {
        const filter = getSectionFilter(index);
        return (
          <section
            className={[
              'event-section',
              section.venue ? 'venue-section' : '',
            ].join(' ')}
            key={JSON.stringify(dateFilter) + index}
          >
            {!section.venue && (
              <SectionHeader title={section.title} TitleElem={'h2'} />
            )}
            {section.venue && (
              <div className="venue">
                <VenueSliderTile
                  imgWidths={[600, 1000, 20000]}
                  imgSizes="(min-width: 800px) calc(50vw - 2em - 7px), calc(100vw - 4em)"
                  baseUrl={baseUrl}
                  venue={section.venue}
                />
              </div>
            )}
            <div className="row">
              <EventRow
                rowCount={section.venue ? 2 : 1}
                filter={filter}
                baseUrl={baseUrl}
                sortBy={sortBy}
              />
            </div>
            <Observer onChange={getAddSection(index)} treshold={0.25}>
              <div />
            </Observer>
          </section>
        );
      })}
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 0 0 1.5em;
          border-bottom: 1px solid ${colors.separator};
          padding: 1em 0;
        }
        .filter {
          margin-bottom: 2em;
        }
        .event-section:not(:first-of-type) {
          margin-top: 2em;
        }
        .event-section.venue-section {
          display: grid;
          grid-gap: ${dimensions.gridGap};
          grid-template-rows: 15em auto;
          grid-template-columns: 100%;
          border-top: 1px solid ${colors.separator};
          padding-top: 3em;
          margin-top: 4em;
        }
        @media (min-width: 800px) {
          .event-section.venue-section {
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

IbizaCityPage.getInitialProps = async ctx => {
  const { pageSlug, baseUrl } = ctx.query;
  return {
    baseUrl,
    pageSlug,
  };
};

export default withPageLayout()(IbizaCityPage);
