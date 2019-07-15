import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getEvents, getTagBySlug, getVenues } from '../lib/api';
import __, { _o, __city } from '../lib/i18n';
import { getPostsFiltered } from '../lib/ghost';
import SectionHeader from '../components/SectionHeader';
import CityTitleButton from '../components/CityTitleButton';
import EventGrid from '../components/events/EventGrid';
import ArticleGrid from '../components/articles/ArticleGrid';
import VenueGrid from '../components/venues/VenueGrid';

function CityTagPage(props) {
  const { venues, events, articles, tag, pageSlug, routeParams } = props;

  const cityName = __city(pageSlug)('name');
  const description = __city(pageSlug)(`tagDescriptions.${tag.slug}`);

  return (
    <main>
      <Head>
        <title>{__(`tag.meta.title.${tag.slug}`)}</title>
        {!!description && <meta name="description" content={description} />}
      </Head>

      <h1>
        {__(`tag.titles.${tag.slug}`)}
        &nbsp;
        <CityTitleButton pageSlug={pageSlug} city={cityName} />
      </h1>
      {!!description && <p className={'intro'}>{description}</p>}
      {!!venues.length && (
        <section className={'venues'}>
          <SectionHeader title={__('cityTagPage.venues')} TitleElem={'h3'} />
          <div className={'content'}>
            <VenueGrid routeParams={routeParams} venues={venues} />
          </div>
        </section>
      )}
      {!!events.length && (
        <section className={'events'}>
          <SectionHeader title={__('cityTagPage.events')} TitleElem={'h3'} />
          <div className={'content'}>
            <EventGrid routeParams={routeParams} events={events} />
          </div>
        </section>
      )}
      {!!articles.length && (
        <section className={'articles'}>
          <SectionHeader title={__('cityTagPage.articles')} TitleElem={'h3'} />
          <div className={'content'}>
            <ArticleGrid routeParams={routeParams} articles={articles} />
          </div>
        </section>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 0;
          padding: 1em 0 0.5em;
          line-height: 1.6;
        }
        .intro {
          margin-bottom: 2em;
        }
        .venues {
          margin: 1em 0 2em;
        }
        .events,
        .articles {
          margin: 2em 0;
        }
      `}</style>
    </main>
  );
}

CityTagPage.getInitialProps = async ctx => {
  let { pageSlug, tag: tagSlug } = ctx.query;
  const tag = await getTagBySlug(tagSlug);
  return {
    tag,
    venues: (await getVenues({
      query: {
        pageSlug,
        tag: tag.id,
      },
    })).results,
    events: (await getEvents({
      query: {
        pageSlug,
        tag: tag.id,
      },
    })).results,
    articles: await getPostsFiltered(
      `tag:${pageSlug.replace('/', '-')}+tag:${tag.slug}`,
      {
        limit: 6,
      }
    ),
  };
};

const getBreadcrumbs = ({ tag }) => [
  { key: 'explore', url: 'explore' },
  { key: 'tag', name: _o(tag.name) },
];

export default withPageLayout(getBreadcrumbs)(CityTagPage);
