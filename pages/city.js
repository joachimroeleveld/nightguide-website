import Link from 'next/link';
import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import colors from '../styles/dimensions';
import { getEvents, getTags } from '../lib/api';
import __ from '../lib/i18n';
import { getPostsFiltered } from '../lib/ghost';
import SectionHeader from '../components/SectionHeader';
import PrimaryButton from '../components/PrimaryButton';
import CityTitleButton from '../components/CityTitleButton';
import Card from '../components/Card';
import ExploreGrid from '../components/tags/ExploreGrid';
import EventGrid from '../components/events/EventGrid';
import ArticleGrid from '../components/articles/ArticleGrid';
import { CitySpotlight } from '../components/CitySpotlight';

const SPOTLIGHT_EVENTS = [
  '5cdaae3708f408100d6896f0',
  '5cdaace708f408100d66ae04',
  '5cdaad5308f408100d6736a7',
];

function CityPage(props) {
  const { baseUrl, city, events, blogs, tags, spotlightEvents } = props;
  return (
    <main>
      <Head>
        <title>{__('cityPage.meta.title', { city })}</title>
        <meta
          name="description"
          content={__('cityPage.meta.description', { city })}
        />
      </Head>

      <h1>
        <span
          dangerouslySetInnerHTML={{ __html: __('cityPage.discoverBarsClubs') }}
        />
        &nbsp;
        <CityTitleButton href={baseUrl} city={city} />
      </h1>
      <section className={'spotlight'}>
        <CitySpotlight events={spotlightEvents} baseUrl={baseUrl} />
      </section>
      <section className={'explore'}>
        <SectionHeader
          seeAllHref={`${baseUrl}/explore`}
          title={__('cityPage.explore')}
          TitleElem={'h3'}
        />
        <ExploreGrid limitItems={8} baseUrl={baseUrl} tags={tags} />
        <div className="chat-wrapper">
          <Card>
            <footer className="chat">
              <span className={'ask-staff'}>{__('cityPage.askOurStaff')}</span>
              <div className={'chat-button'}>
                <Link href={'/expert-chat'}>
                  <PrimaryButton title={__('cityPage.startChat')} />
                </Link>
              </div>
            </footer>
          </Card>
        </div>
      </section>
      <section className={'events'}>
        <SectionHeader
          seeAllHref={`${baseUrl}/events`}
          title={__('cityPage.events')}
          TitleElem={'h3'}
        />
        <div className={'content'}>
          <EventGrid baseUrl={baseUrl} events={events} />
        </div>
      </section>
      <section className={'articles'}>
        <SectionHeader
          seeAllHref={`${baseUrl}/articles`}
          title={__('cityPage.articles')}
          TitleElem={'h3'}
        />
        <div className={'content'}>
          <ArticleGrid baseUrl={baseUrl} articles={blogs} />
        </div>
      </section>
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 0 0 1em;
          border-bottom: 1px solid ${colors.separator};
          padding: 1em 0;
          line-height: 1.6;
        }
        .chat-wrapper {
          margin: 3em 0;
        }
        .chat {
          display: grid;
          justify-items: center;
          align-items: center;
        }
        .chat-button {
          width: 70%;
        }
        .ask-staff {
          font-weight: 300;
          font-size: 20px;
          margin-bottom: 0.7em;
        }
        .articles,
        .events,
        .explore {
          margin: 2em 0;
        }
        @media (min-width: 41rem) {
          .chat {
            grid-template-columns: 1fr 1fr;
          }
          .ask-staff {
            margin-bottom: 0em;
          }
        }
      `}</style>
    </main>
  );
}

CityPage.getInitialProps = async ctx => {
  let { country, city, citySlug } = ctx.query;
  return {
    city,
    spotlightEvents: (await getEvents({
      fields: ['title', 'images', 'facebook'],
      query: {
        ids: SPOTLIGHT_EVENTS,
      },
    })).results,
    events: (await getEvents({
      limit: 8,
      fields: ['title', 'images', 'facebook'],
      query: {
        country,
        city,
      },
    })).results,
    blogs: await getPostsFiltered(`tags:${citySlug}`, { limit: 6 }),
    tags: (await getTags()).results,
  };
};

export default withPageLayout()(CityPage);
