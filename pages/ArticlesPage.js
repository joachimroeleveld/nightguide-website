import Head from 'next/dist/next-server/lib/head';

import withPageLayout from '../components/PageLayout';
import { getConfigByName, getContent } from '../lib/api';
import __, { __city, _o } from '../lib/i18n';
import CityMenu from '../components/CityMenu';
import colors from '../styles/colors';
import React from 'react';
import ArticleGrid from '../components/articles/ArticleGrid';
import HeaderImage from '../components/HeaderImage';
import dimensions from '../styles/dimensions';
import TitleWithImage from '../components/TitleWithImage';

function ArticlesPage(props) {
  const { sections, articles, pageSlug, routeParams } = props;

  const cityName = __(`city.${pageSlug}.name`);

  return (
    <main>
      <Head>
        <title>{__('ArticlesPage.meta.title', { city: cityName })}</title>
        <meta
          name="description"
          content={__('ArticlesPage.meta.description', { city: cityName })}
        />
      </Head>

      <div className="menu">
        <CityMenu pageSlug={pageSlug} routeParams={routeParams} />
      </div>

      {sections.map((section, index) => (
        <section className="section" key={index}>
          <h2>{_o(section.title)}</h2>
          <div className="grid">
            <ArticleGrid articles={articles[index]} routeParams={routeParams} />
          </div>
        </section>
      ))}

      {/*language=CSS*/}
      <style jsx>{`
        .subtitle {
          display: block;
          color: ${colors.textSecondary};
        }
        .section {
          margin: 1.5em 0;
        }
        .grid {
          margin: 1.5em 0;
        }
        .menu {
          margin: 1em 0 1.5em;
        }
        @media (max-width: 800px) {
          .section h2 {
            padding: 0.5em 0;
            border-bottom: 1px solid ${colors.separator};
          }
          .menu {
            display: none;
          }
        }
        @media (min-width: 800px) {
          .menu {
            margin-bottom: 4em;
          }
          .section {
            margin: 2.5em 0;
          }
        }
      `}</style>
    </main>
  );
}

ArticlesPage.getInitialProps = async ({ query }) => {
  const { pageSlug } = query;

  const config = await getConfigByName('page_articles', pageSlug);
  const cityConfig = await getConfigByName('page_city', pageSlug);
  const { sections } = config.payload;

  const articlePromises = sections.map(section =>
    getContent({ query: { ids: section.articles } }).then(res => res.results)
  );

  const articles = await Promise.all(articlePromises);

  return {
    cityConfig: cityConfig.payload,
    sections,
    articles,
  };
};

const breadcrumbs = () => [{ key: 'articles' }];

export default withPageLayout({
  breadcrumbs,
  TitleComponent: props => {
    const { pageSlug, cityConfig } = props;
    const { headerImage } = cityConfig;
    const cityName = __city(pageSlug)('name');
    return (
      <TitleWithImage
        imgSrc={headerImage}
        title={__('ArticlesPage.title', { city: cityName })}
        subtitle={__('ArticlesPage.subtitle', { city: cityName })}
      />
    );
  },
})(ArticlesPage);
