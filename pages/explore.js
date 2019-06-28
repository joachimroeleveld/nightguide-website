import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getTags } from '../lib/api';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import ExploreGrid from '../components/tags/ExploreGrid';

function CityExplorePage(props) {
  const { baseUrl, pageSlug, tags } = props;

  const cityName = __(`city.${pageSlug}.name`);

  return (
    <main>
      <Head>
        <title>
          {__('cityExplorePage.meta.title', {
            city: cityName,
            tagCount: tags.length,
          })}
        </title>
        <meta
          name="description"
          content={__('cityExplorePage.meta.description', { city: cityName })}
        />
      </Head>

      <h1>
        {__('cityExplorePage.explore')}{' '}
        <CityTitleButton href={baseUrl} city={cityName} />
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
  const { pageSlug } = ctx.query;
  return {
    pageSlug,
    tags: (await getTags()).results,
  };
};

const getBreadcrumbs = () => [{ key: 'explore' }];

export default withPageLayout(getBreadcrumbs)(CityExplorePage);
