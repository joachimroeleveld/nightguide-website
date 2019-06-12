import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getPostsFiltered } from '../lib/ghost';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import CityTitleButton from '../components/CityTitleButton';
import ArticleGrid from '../components/articles/ArticleGrid';

function CityArticlesPage(props) {
  const { city, articles, baseUrl } = props;

  const getItems = (page, limit) => {
    return getArticlesPage(city, page, limit);
  };

  return (
    <main>
      <Head>
        <title>{__('cityArticlesPage.meta.title', { city })}</title>
        <meta
          name="description"
          content={__('cityArticlesPage.meta.description', { city })}
        />
      </Head>

      <h1>
        {__('cityArticlesPage.articlesAbout')}{' '}
        <CityTitleButton href={baseUrl} city={city} />
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
  const { city, citySlug } = ctx.query;
  return {
    city,
    articles: await getArticlesPage(citySlug),
  };
};

async function getArticlesPage(citySlug, page = 1, limit = 6) {
  return await getPostsFiltered(`tags:${citySlug}`, {
    limit,
    page,
  });
}

const getBreadcrumbs = () => [{ key: 'articles', url: 'articles' }];

export default withPageLayout(getBreadcrumbs)(CityArticlesPage);
