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
  {
    name: 'Ibiza',
    url: '/es/ibiza',
    imgSrc: '/static/img/city-ibiza.jpg',
  },
];

function Index() {
  return (
    <div className={'container'}>
      <Head>
        <title>{__('homePage.meta.title')}</title>
        <meta name="description" content={__('homePage.meta.description')} />
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
                  <Tile
                    title={city.name}
                    imgProps={{ url: city.imgSrc, widths: [320] }}
                  />
                </a>
              </Link>
            ))}
          </nav>
        </section>
      </main>
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
        }
      `}</style>
    </div>
  );
}

export default withPageLayout()(Index);
