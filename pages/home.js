import withPageLayout from '../components/PageLayout';
import Head from 'next/head';
import { Link } from '../routes';

import css from 'styled-jsx/css';
import __ from '../lib/i18n';
import Tile from '../components/Tile';
import dimensions from '../styles/dimensions';

const CITIES = [
  {
    name: 'Ibiza',
    route: '/es/ibiza',
    imgSrc:
      'https://lh3.googleusercontent.com/JIvV5nfuJZUffg1SxB2Ibn_1YE0ovrX_1yH32cjuONue7maTtVZ6mAqDVq0uZGN3I0SKgcbI8d0p9k16wDp73I7w0NCJoUAfKg',
  },
  {
    name: 'Utrecht',
    route: '/nl/utrecht',
    imgSrc:
      'https://lh3.googleusercontent.com/jzaMHPflMSmS-6n9lerUthF5ZlJOzwIBcdHQsrDm0ztNCq5KBZTafoWArrMfMgUrNHhnUULHwd5Va4sVbCi0Cj7z4F5Xx1H2',
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
              <Link key={city.name} route={city.route}>
                <a className="city">
                  <Tile
                    title={city.name}
                    imgProps={{ url: city.imgSrc, widths: [320] }}
                    {...css.resolve`
                      .top {
                        height: 10em;
                      }
                    `}
                    imgWidths={[300, 600, 1000]}
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
          display: block;
          max-width: 20em;
          flex-basis: 20em;
          flex-wrap: wrap;
          margin-right: ${dimensions.gridGap};
        }
        .cities {
          padding: 1em 0;
        }
        .cities nav {
          display: flex;
        }
        @media (min-width: 50em) {
          main {
            padding-top: 7em;
          }
        }
      `}</style>
    </div>
  );
}

export default withPageLayout()(Index);
