import React, { Fragment } from 'react';
import Head from 'next/head';

import { getContentBySlug } from '../lib/api';
import VenuesArticlePage from './VenuesArticlePage';
import BlogPage from './BlogPage';
import { redirect } from '../lib/routing';
import __, { _o } from '../lib/i18n';
import find from 'lodash/find';
import { trimToDescription } from '../lib/util';

function ArticlePage(props) {
  const { article } = props;
  const { title, coverImage, images = [], intro } = article;

  const image = coverImage && find(images, { id: coverImage });

  const PageComponent = getPageComponent(article.type);

  return (
    <Fragment>
      <Head>
        {title && (
          <title>{__('ArticlePage.meta.title', { title: _o(title) })}</title>
        )}
        {image && <meta property="og:image" content={`${image.url}=s1200`} />}
        {intro && (
          <meta name="description" content={trimToDescription(_o(intro))} />
        )}
      </Head>
      <PageComponent {...props} />
    </Fragment>
  );
}

ArticlePage.getInitialProps = async ctx => {
  const { query, res } = ctx;
  const article = await getContentBySlug(query.article);

  const currentSlug = article.urlSlugs[0];
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
      return VenuesArticlePage;
    case 'blog':
      return BlogPage;
  }
}

export default ArticlePage;
