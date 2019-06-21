import Link from 'next/link';
import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
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
import colors from '../styles/colors';

const SPOTLIGHT_EVENTS = [
  '5cdaad3a08f408100d67156f',
  '5d026f50c50e7ce9e68db305',
  '5d026e21c50e7ce9e68c7e1c',
];

function CityPage(props) {
  const {
    baseUrl,
    city,
    events,
    blogs,
    tags,
    spotlightEvents,
    citySlug,
    countrySlug,
  } = props;

  const __city = (scope, ...args) =>
    __(`city.${countrySlug}.${citySlug}.${scope}`, ...args);

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
        <CityTitleButton href={baseUrl} city={city} disabled={true} />
      </h1>
      <p className="intro">{__city('intro')}</p>

      <section className={'spotlight'}>
        <SectionHeader title={__('cityPage.trendingEvents')} TitleElem={'h2'} />
        <CitySpotlight
          events={spotlightEvents}
          eventIds={SPOTLIGHT_EVENTS}
          baseUrl={baseUrl}
        />
      </section>

      <section className={'explore'}>
        <SectionHeader
          seeAllHref={`${baseUrl}/explore`}
          title={__('cityPage.explore')}
          TitleElem={'h2'}
        />
        <p className="intro">{__city('exploreIntro')}</p>
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
          TitleElem={'h2'}
        />
        <p className="intro">{__city('eventsIntro')}</p>
        <div className={'content'}>
          <EventGrid baseUrl={baseUrl} events={events} />
        </div>
      </section>

      <section className={'articles'}>
        <SectionHeader
          seeAllHref={`${baseUrl}/articles`}
          title={__('cityPage.articles')}
          TitleElem={'h2'}
        />
        <p className="intro">{__city('articlesIntro')}</p>
        <div className={'content'}>
          <ArticleGrid baseUrl={baseUrl} articles={blogs} />
        </div>
      </section>

      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin: 1.2em 0;
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
        .intro {
          font-size: 0.9em;
          color: ${colors.textSecondary};
        }
        .articles .intro,
        .events .intro,
        .explore .intro {
          margin: -0.7em 0 2em;
        }
        @media (min-width: 800px) {
          .intro {
            font-size: 0.95em;
          }
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
  let { country, city, citySlug, countrySlug } = ctx.query;
  return {
    citySlug,
    countrySlug,
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
