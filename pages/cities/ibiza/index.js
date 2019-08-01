import React, { useMemo } from 'react';
import Head from 'next/head';
import moment from 'moment-timezone';
import range from 'lodash/range';
import css from 'styled-jsx/css';

import { getEvents } from '../../../lib/api';
import withPageLayout from '../../../components/PageLayout';
import __, { __city } from '../../../lib/i18n';
import EventDateFilterBar from '../../../components/events/EventDateFilterBar';
import ResponsiveImage from '../../../components/ResponsiveImage';
import ExploreEventsTiles from '../../../components/ExploreEventsTiles';
import SectionLoader from '../../../components/SectionLoader';
import EventRow from '../../../components/events/EventRow';
import { SORT_DATE, SORT_POPULARITY } from '../../../components/events/util';
import { useDateFilter } from '../../../components/events/hooks';
import { getListings } from '../index';

const getDateSections = () => {
  const dow = moment().day();

  const sections = [
    // Today
    {
      title: __('dates.today'),
      id: 'today',
      filter: {
        dateTo: moment({ hour: 23, minute: 59 }).toDate(),
      },
    },
  ];

  if (![4, 5].includes(dow)) {
    sections.push({
      // Tomorrow
      title: __('dates.tomorrow'),
      id: 'tomorrow',
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
      title: __('dates.thisWeekend'),
      id: 'weekend',
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

function IbizaCityPage(props) {
  const { pageSlug, routeParams, preloadedSections, query, listings } = props;

  const {
    dateFilter,
    setDateFilter,
    dateFilterId,
    dateFilterChanged,
  } = useDateFilter(query, props);

  const dateSections = useMemo(() => {
    const sections = [];

    // No date applied
    if (!dateFilter) {
      sections.push(...preloadedSections);
    }

    // Date filter applied
    if (dateFilter) {
      const dateFrom = moment(dateFilter[0]);
      const dateTo = moment(dateFilter[1]);
      const amountDays = Math.abs(dateFrom.diff(dateTo, 'days')) + 1;
      const format = date =>
        date
          .format('ddd, LL')
          .match(/^(\w+, \w+ \w+)/)
          .pop();

      // If not today/tomorrow and not more than 3 days
      if (amountDays <= 3) {
        const daySections = range(0, amountDays).map(day => {
          // Localized form of day and month
          const date = moment(dateFrom).add(day, 'days');
          return {
            title: format(date),
            filter: {
              dateFrom: date.toDate(),
              dateTo: moment(date)
                .set({ hour: 23, minute: 59 })
                .toDate(),
            },
          };
        });
        sections.push(...daySections);
      } else {
        sections.push({
          title: `${format(dateFrom)} - ${format(dateTo)}`,
        });
      }
    }

    return sections.map(({ id, filter = {}, ...section }) => {
      return {
        seeAllParams: {
          dateFilter: id,
          dateFrom: filter.dateFrom,
          dateTo: filter.dateTo,
        },
        filter,
        ...section,
      };
    });
  }, [dateFilter]);

  const sections = useMemo(() => {
    return [...dateSections, ...listings.HOME_SECTIONS].map(section => {
      const filter = Object.assign({}, section.filter);
      // Apply date filter
      if (dateFilter && !filter.dateFrom) {
        filter.dateFrom = moment(dateFilter[0]).toDate();
        filter.dateTo = moment(dateFilter[1]).toDate();
      }
      return {
        ...section,
        filter: {
          ...filter,
          pageSlug,
        },
      };
    });
  }, [dateSections]);

  const renderSection = ({ seeAllParams, filter, preloaded = {} }) => (
    <EventRow
      filter={filter}
      seeAllParams={seeAllParams}
      routeParams={routeParams}
      events={!dateFilterChanged && preloaded.results}
      totalCount={!dateFilterChanged && preloaded.totalCount}
      sortBy={!filter.venue ? SORT_POPULARITY : SORT_DATE}
    />
  );

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
        <div className="title">
          <h1>{__city(pageSlug)('title')}</h1>
          <span className="subtitle">{__city(pageSlug)('subtitle')}</span>
        </div>
        <div className="img">
          <ResponsiveImage
            url="https://lh3.googleusercontent.com/zmoy9Xzv6KsYUnkfnufIXwjmk2pHoaqokyMxlIHP60sPkkqx8L7nGUpRIWpTwxExVC6vULI2c1v0In4JKPzDlEzueXr5Qpov"
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
        <EventDateFilterBar
          activeButton={dateFilterId}
          startDate={dateFilter && dateFilter[0]}
          endDate={dateFilter && dateFilter[1]}
          onChange={setDateFilter}
        />
      </div>
      <section className="explore-events">
        <h2>{__('cityPage.exploreEvents')}</h2>
        <ExploreEventsTiles routeParams={routeParams} />
      </section>
      <SectionLoader
        sections={sections}
        renderSection={renderSection}
        preloadedSections={preloadedSections.length}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .header {
          height: 200px;
          margin: 0 -2em 1em;
          display: flex;
          align-items: flex-end;
          position: relative;
        }
        .header .title {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 3em 2rem 1em;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
        .header .subtitle {
          display: block;
          margin: 0.2em 0 0.4em;
        }
        .header h1 {
          margin: 0.2em 0;
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
        .explore-events {
          margin: 2em -2em 2em 0;
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
          .event-section .row {
            height: 100%;
          }
        }
      `}</style>
    </main>
  );
}

IbizaCityPage.getInitialProps = async ({ query }) => {
  const { pageSlug } = query;
  const listings = getListings(pageSlug);

  const preloadedSections = await Promise.all(
    getDateSections().map(async section => ({
      ...section,
      preloaded: await getEvents({
        sortBy: SORT_POPULARITY,
        limit: 8,
        query: {
          pageSlug: 'es/ibiza',
          ...section.filter,
        },
      }),
    }))
  );

  return {
    listings,
    preloadedSections,
  };
};

export default withPageLayout()(IbizaCityPage);
