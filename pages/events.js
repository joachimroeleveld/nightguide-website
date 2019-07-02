import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getEvents } from '../lib/api';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import EventGrid from '../components/events/EventGrid';

function CityEventsPage(props) {
  const { pageSlug, events, baseUrl } = props;

  const getItems = async (offset, limit) => {
    return (await getEventsPage(pageSlug, offset, limit)).results;
  };

  const cityName = __(`city.${pageSlug}.name`);

  return (
    <main>
      <Head>
        <title>{__('cityEventsPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('cityEventsPage.meta.description', { city: cityName })}
        />
      </Head>

      <h1>
        {__('cityEventsPage.eventsIn')}{' '}
        <CityTitleButton href={baseUrl} city={cityName} />
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
  const { pageSlug, baseUrl } = ctx.query;
  return {
    baseUrl,
    pageSlug,
    events: await getEventsPage(pageSlug),
  };
};

async function getEventsPage(pageSlug, offset = 0, limit = 8) {
  return await getEvents({
    limit,
    offset,
    query: {
      pageSlug,
    },
  });
}

const getBreadcrumbs = () => [{ key: 'events' }];

export default withPageLayout(getBreadcrumbs)(CityEventsPage);
