import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getTags } from '../lib/api';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import ExploreGrid from '../components/tags/ExploreGrid';

function CityExplorePage(props) {
  const { citySlug, countrySlug, country, city, tags } = props;
  const baseUrl = `/${countrySlug}/${citySlug}`;

  return (
    <main>
      <Head>
        <title>
          {__('cityExplorePage.meta.title', { city, tagCount: tags.length })}
        </title>
        <meta
          name="description"
          content={__('cityExplorePage.meta.description', { city })}
        />
      </Head>

      <h1>
        {__('cityExplorePage.explore')}{' '}
        <CityTitleButton href={baseUrl} city={city} />
      </h1>

      <ExploreGrid baseUrl={baseUrl} tags={tags} />
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

CityExplorePage.getInitialProps = async ctx => {
  const { country, city, citySlug, countrySlug } = ctx.query;
  return {
    tags: (await getTags()).results,
    city,
    citySlug,
    countrySlug,
  };
};

export default withPageLayout(CityExplorePage);
