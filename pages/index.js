import withPageLayout from '../components/PageLayout';
import Head from 'next/head';
import Link from 'next/link';

import __ from '../lib/i18n';
import Tile from '../components/Tile';

const CITIES = [
  {
    name: 'Utrecht',
    url: '/nl/utrecht',
    imgSrc: '/static/img/city-utrecht.jpg',
  },
];

function Home() {
  return (
    <div className={'container'}>
      <Head>
        <title>{__('homePage.meta.title')}</title>
        <meta
          property="description"
          content={__('homePage.meta.description')}
        />
      </Head>

      <main>
        <div className="text">
          <h1>{__('homePage.title')}</h1>
          <p dangerouslySetInnerHTML={{ __html: __('homePage.subtitle') }} />
        </div>
        <section className="cities">
          <h2>{__('homePage.cities')}</h2>
          <nav>
            {CITIES.map(city => (
              <Link key={city.name} href={city.url}>
                <a className="city">
                  <Tile title={city.name} imgProps={{ src: city.imgSrc }} />
                </a>
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <picture className={'phone-container'}>
        <img src="/static/img/app.png" alt="NightGuide app" />
      </picture>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: grid;
        }
        .text {
          max-width: 20em;
        }
        h1 {
          margin: 0;
        }
        main {
          padding-top: 3em;
        }
        .phone-container {
          padding-top: 4em;
          display: flex;
          justify-content: center;
        }
        .phone-container img {
          max-width: 100%;
        }
        .city {
          display: flex;
        }
        .cities {
          padding: 1em 0;
        }
        @media (min-width: 50em) {
          .container {
            grid-template-columns: 1fr 1fr;
          }
          main {
            padding-top: 7em;
          }
          .phone-container {
            margin-top: -1em;
          }
        }
      `}</style>
    </div>
  );
}

export default withPageLayout(Home);
