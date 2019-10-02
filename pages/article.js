import React from 'react';

import { getContentBySlug } from '../lib/api';
import VenuesArticle from './venuesArticle';
import { redirect } from '../lib/routing';

function ArticlePage(props) {
  const { article } = props;

  const PageComponent = getPageComponent(article.type);

  return <PageComponent {...props} />;
}

ArticlePage.getInitialProps = async ctx => {
  const { query, res } = ctx;
  const article = await getContentBySlug(query.article);

  const currentSlug = article.urlSlugs.slice(-1)[0];
  if (res && currentSlug !== query.article) {
    return redirect(res, currentSlug);
  }

  let PageComponent = getPageComponent(article.type);

  let otherProps = {};
  if (PageComponent.getInitialProps) {
    otherProps = await Promise.resolve(
      PageComponent.getInitialProps({
        ...ctx,
        article,
      })
    );
  }

  return {
    article,
    ...otherProps,
  };
};

function getPageComponent(type) {
  switch (type) {
    case 'venues-article':
      return VenuesArticle;
  }
}

export default ArticlePage;
