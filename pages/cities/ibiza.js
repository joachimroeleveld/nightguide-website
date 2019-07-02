import Head from 'next/head';

import withPageLayout from '../../components/PageLayout';
import { getEvents } from '../../lib/api';
import CityTitleButton from '../../components/CityTitleButton';
import __ from '../../lib/i18n';
import colors from '../../styles/colors';
import EventDateFilterBar from '../../components/EventDateFilterBar';
import EventGrid from '../../components/events/EventGrid';

function IbizaCityPage(props) {
  const { pageSlug, events, baseUrl } = props;

  const __city = (scope, ...args) => __(`city.${pageSlug}.${scope}`, ...args);
  const cityName = __city('name');

  const getItems = async (offset, limit) => {
    return (await getEventsPage(pageSlug, offset, limit)).results;
  };

  return (
    <main>
      <Head>
        <title>{__city('meta.title')}</title>
        <meta name="description" content={__city('meta.description')} />
      </Head>

      <h1>
        {__('cityEventsPage.eventsIn')}
        <CityTitleButton disabled={true} href={baseUrl} city={cityName} />
      </h1>
      {/*<EventDateFilterBar  />*/}
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

IbizaCityPage.getInitialProps = async ctx => {
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

export default withPageLayout()(IbizaCityPage);
