import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getPostsFiltered } from '../lib/ghost';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import ArticleGrid from '../components/articles/ArticleGrid';

function CityArticlesPage(props) {
  const { pageSlug, articles, baseUrl } = props;

  const getItems = (page, limit) => {
    return getArticlesPage(pageSlug, page, limit);
  };

  const cityName = __(`city.${pageSlug}.name`);

  return (
    <main>
      <Head>
        <title>{__('cityArticlesPage.meta.title', { cityName })}</title>
        <meta
          name="description"
          content={__('cityArticlesPage.meta.description', { cityName })}
        />
      </Head>

      <h1>
        {__('cityArticlesPage.articlesAbout')}{' '}
        <CityTitleButton href={baseUrl} city={cityName} />
      </h1>

      <ArticleGrid
        infinite={true}
        articles={articles}
        getItems={getItems}
        baseUrl={baseUrl}
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

CityArticlesPage.getInitialProps = async ctx => {
  const { pageSlug } = ctx.query;
  return {
    pageSlug,
    articles: await getArticlesPage(pageSlug),
  };
};

async function getArticlesPage(pageSlug, page = 1, limit = 6) {
  return await getPostsFiltered(`tags:${pageSlug.replace('/', '-')}`, {
    limit,
    page,
  });
}

const getBreadcrumbs = () => [{ key: 'articles' }];

export default withPageLayout(getBreadcrumbs)(CityArticlesPage);
