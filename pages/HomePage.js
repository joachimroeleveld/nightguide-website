import withPageLayout from '../components/PageLayout';
import Head from 'next/head';
import { Link } from '../routes';

import css from 'styled-jsx/css';
import __, { __city } from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import EventRow from '../components/events/EventRow';
import { SORT_POPULARITY } from '../components/events/util';
import { getEvents } from '../lib/api';
import SectionHeader from '../components/SectionHeader';
import colors from '../styles/colors';

const CITIES = [
  // {
  //   pageSlug: 'nl/amsterdam',
  //   routeParams: { city: 'amsterdam', country: 'nl' },
  //   imgSrc:
  //     'https://lh3.googleusercontent.com/llIYkeCt9tNuXZUwZKXYztmtUIIAQ_wzQMmagU_xizxD7qWmIhKpX2GKxqT1Gaf_GXe4J7u5Hu_fQnjORMmUz9XAnIQjgkTQ8g',
  // },
  {
    pageSlug: 'es/ibiza',
    routeParams: { city: 'ibiza', country: 'es' },
    imgSrc:
      'https://lh3.googleusercontent.com/JIvV5nfuJZUffg1SxB2Ibn_1YE0ovrX_1yH32cjuONue7maTtVZ6mAqDVq0uZGN3I0SKgcbI8d0p9k16wDp73I7w0NCJoUAfKg',
  },
  // {
  //   name: 'Utrecht',
  //   pageSlug: 'nl/utrecht',
  //   routeParams: { city: 'utrecht', country: 'nl' },
  //   imgSrc:
  //     'https://lh3.googleusercontent.com/jzaMHPflMSmS-6n9lerUthF5ZlJOzwIBcdHQsrDm0ztNCq5KBZTafoWArrMfMgUrNHhnUULHwd5Va4sVbCi0Cj7z4F5Xx1H2',
  // },
];

function HomePage(props) {
  const { cityEvents } = props;

  return (
    <div className={'container'}>
      <Head>
        <title>{__('HomePage.meta.title')}</title>
        <meta name="description" content={__('HomePage.meta.description')} />
      </Head>

      <main>
        <header className="header">
          <div className="img">
            <ResponsiveImage
              url="https://lh3.googleusercontent.com/R05wp1YP7UVIr32g7ZsUBnIUyiQVof097YOJ9aUjlPDkCwRIhJc_N6RN2WdxBgwcuw0v-F0djtRSCCTYlkQW63qpB1r6D_yPvw"
              widths={[300, 600, 1000, 2000, 3000]}
              width={1695}
              height={1130}
              sizes="100vw"
              /*language=CSS*/
              {...css.resolve`
                .container {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              `}
            />
          </div>
          <img
            className="logo"
            width={138}
            height={68}
            src="/static/img/logo.svg"
            alt="NightGuide"
          />
          <div className="title">
            <h1>{__('HomePage.title')}</h1>
            <span
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: __('HomePage.subtitle') }}
            />
          </div>
        </header>
        <section className="city-tiles">
          <h2>{__('HomePage.cities')}</h2>
          <nav>
            <ul>
              <li className="tile">
                {CITIES.map(city => (
                  <Link key={city.pageSlug} route={`/${city.pageSlug}`}>
                    <a>
                      <figure className="img">
                        <ResponsiveImage
                          scale={true}
                          url={city.imgSrc}
                          widths={[320, 600]}
                          sizes={`(max-width: 960px) calc(100vw - 4em - ${14 *
                            CITIES.length}px), 320px`}
                        />
                      </figure>
                      <h3 className="name">{__city(city.pageSlug)('name')}</h3>
                    </a>
                  </Link>
                ))}
              </li>
            </ul>
          </nav>
        </section>
        <div className="city-events">
          {CITIES.map(({ pageSlug, routeParams }) => (
            <section key={pageSlug}>
              <SectionHeader
                title={__('HomePage.eventsInCity', {
                  city: __city(pageSlug)('name'),
                })}
                TitleElem={'h2'}
              />
              <EventRow
                key={pageSlug}
                events={cityEvents[pageSlug].results}
                routeParams={routeParams}
              />
            </section>
          ))}
        </div>
      </main>
      {/*language=CSS*/}
      <style jsx>{`
        .text {
          max-width: 20em;
        }
        .header {
          display: flex;
          align-items: flex-end;
          box-sizing: border-box;
          margin-bottom: -0.5em;
        }
        .header .title {
          padding-bottom: 3em;
          position: relative;
          z-index: 1;
        }
        .logo {
          position: absolute;
          left: 2em;
          top: 1em;
          z-index: 1;
          width: 6em;
        }
        .header .img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
        }
        .header .img:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            180deg,
            rgba(31, 31, 31, 0) 0%,
            #1f1f1f 100%
          );
        }
        .header,
        .header .img {
          height: 300px;
        }
        h1 {
          margin: 0 0 0.3em;
        }
        .city-tiles {
          position: relative;
        }
        .city-tiles .tile {
          display: block;
          max-width: 17em;
          flex-basis: 20em;
          flex-wrap: wrap;
          border-radius: 10px;
          background: ${colors.tileBg};
          box-shadow: ${colors.tileShadow};
          overflow: hidden;
        }
        .city-tiles .tile:not(:last-child) {
          margin-right: ${dimensions.gridGap.L};
        }
        .city-tiles ul {
          display: flex;
        }
        .city-tiles .img {
          height: 11em;
          overflow: hidden;
          width: 100%;
        }
        .city-tiles .img :global(.container) {
          display: block;
          height: 100%;
        }
        .city-tiles .name {
          color: #fff;
          font-size: 1rem;
          margin: 0.4em 0.6em;
        }
        .city-events {
          margin-top: 3em;
        }
        .city-events section {
          margin: 2em 0;
        }
        @media (min-width: 960px) {
          .logo {
            width: auto;
          }
          .header,
          .header .img {
            min-height: 300px;
            height: 35vh;
          }
        }
      `}</style>
    </div>
  );
}

HomePage.getInitialProps = async () => {
  const promises = CITIES.map(({ pageSlug }) =>
    getEvents({
      sortBy: SORT_POPULARITY,
      limit: 4,
      query: {
        pageSlug,
      },
    })
  );

  const cityEvents = (await Promise.all(promises)).reduce(
    (acc, events, index) => ({
      ...acc,
      [CITIES[index].pageSlug]: events,
    }),
    {}
  );

  return {
    cityEvents,
  };
};

export default withPageLayout({ HeaderComponent: null })(HomePage);
