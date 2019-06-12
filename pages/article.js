import find from 'lodash/find';
import Head from 'next/head';
import { useMemo } from 'react';

import withPageLayout from '../components/PageLayout';
import { getGhostPostBySlug } from '../lib/ghost';
import { getTags } from '../lib/api';
import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import moment from 'moment';
import TagList from '../components/TagList';
import ResponsiveImage from '../components/ResponsiveImage';
import __ from '../lib/i18n';

const IMAGE_URL_REGEX = /<img.*src="(https:\/\/lh3\.googleusercontent\.com.*?)".*?>/gm;

const generateHtml = html => {
  let Html = [];
  let match;
  let lastIndex = 0;
  while ((match = IMAGE_URL_REGEX.exec(html)) !== null) {
    Html.push(
      <div
        dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }}
      />
    );
    Html.push(
      <ResponsiveImage
        url={match[1]}
        widths={[360, 640, 1000, 2000]}
        sizes={'(max-width: 900px) calc(100vw - 4em), 716px'}
      />
    );
    lastIndex = match.index + match[0].length;
  }
  Html.push(
    <div dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }} />
  );
  return Html;
};

function ArticlePage(props) {
  const { article, tags, baseUrl } = props;

  const { title, html, feature_image, created_at, tags: ghostTags } = article;

  const Html = useMemo(() => generateHtml(html), [html]);

  return (
    <main>
      <Head>
        <title>{__('articlePage.meta.title', { title })}</title>
      </Head>
      <article>
        <header className={'banner'}>
          <ResponsiveImage
            url={feature_image}
            widths={[640, 1000, 2000]}
            sizes={'(max-width: 900px) 100vw, max(calc(60vh * 1.5), 576px)'}
            alt={title}
            imgStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="text">
            <div className="tags">
              <TagList
                baseUrl={baseUrl}
                tags={tags.filter(tag => find(ghostTags, { slug: tag.slug }))}
              />
            </div>
            <h1>{title}</h1>
            <time dateTime={created_at}>{moment(created_at).fromNow()}</time>
          </div>
        </header>
        <div className="article-content content">{Html}</div>
      </article>
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          font-size: 40px;
          line-height: 1.3;
          margin: 0 0 0.3em;
        }
        .banner {
          position: relative;
          margin: 1em -${dimensions.bodyPadding} 4em;
          min-height: 400px;
        }
        .banner .text {
          bottom: 0;
          padding: 3em ${dimensions.bodyPadding} 1em;
        }
        .banner time {
          display: block;
        }
        .content {
          font-size: 20px;
        }
        @media (min-width: 900px) {
          h1 {
            margin: 0;
            padding: 0 10% 0.5em;
            border-bottom: 1px solid ${colors.separator};
          }
          .tags {
            padding: 0 10%;
          }
          .banner {
            display: grid;
            grid-template-columns: 60% 40%;
            min-height: 60vh;
          }
          .banner .text {
            position: static;
            align-self: center;
            padding: 0;
            background-image: none;
          }
          .banner time {
            padding: 1em 10%;
          }
          .content {
            width: 80%;
            margin: 0 auto;
          }
        }
      `}</style>
      {/*language=CSS*/}
      <style jsx global>{`
        .article-content figure {
          margin: 3em 0;
        }
        .article-content figcaption {
          font-size: 0.8em;
          margin: 0.4em;
          color: ${colors.textSecondary};
        }
        .article-content img {
          max-width: 100%;
          border-radius: 6px;
        }
        .article-content a {
          border-bottom: 3px solid ${colors.linkBorder};
          transition: all 0.2s;
        }
        .article-content a:hover {
          border-color: ${colors.linkText};
        }
        .article-content ul,
        .article-content ol {
          margin: 1em 0;
          padding-left: 40px;
        }
      `}</style>
    </main>
  );
}

ArticlePage.getInitialProps = async ctx => {
  const { article } = ctx.query;
  return {
    article: await getGhostPostBySlug(article, {
      query: { include: 'tags' },
    }),
    tags: (await getTags()).results,
  };
};

const getBreadcrumbs = ({ article }) => [
  { key: 'articles', url: 'articles' },
  { key: 'article', url: article.id, title: article.title },
];

export default withPageLayout(getBreadcrumbs)(ArticlePage);
