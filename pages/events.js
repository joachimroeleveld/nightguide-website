import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getEvents } from '../lib/api';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import EventGrid from '../components/events/EventGrid';

function CityEventsPage(props) {
  const { country, city, events, baseUrl } = props;

  const getItems = async (offset, limit) => {
    return (await getEventsPage(country, city, offset, limit)).results;
  };

  return (
    <main>
      <Head>
        <title>{__('cityEventsPage.meta.title', { city })}</title>
        <meta
          name="description"
          content={__('cityEventsPage.meta.description', { city })}
        />
      </Head>

      <h1>
        {__('cityEventsPage.eventsIn')}{' '}
        <CityTitleButton href={baseUrl} city={city} />
      </h1>

      <EventGrid
        baseUrl={baseUrl}
        infinite={true}
        events={events.results}
        totalCount={events.totalCount}
        getItems={getItems}
      />
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 0 0 1.5em;
          border-bottom: 1px solid ${colors.separator};
          padding: 1em 0;
        }
      `}</style>
    </main>
  );
}

CityEventsPage.getInitialProps = async ctx => {
  const { country, city } = ctx.query;
  return {
    city,
    events: await getEventsPage(country, city),
  };
};

async function getEventsPage(country, city, offset = 0, limit = 8) {
  return await getEvents({
    limit,
    offset,
    fields: ['title', 'images', 'facebook'],
    query: {
      country,
      city,
    },
  });
}

const getBreadcrumbs = () => [{ key: 'events', url: 'events' }];

export default withPageLayout(getBreadcrumbs)(CityEventsPage);
