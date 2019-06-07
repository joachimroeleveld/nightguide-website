import find from 'lodash/find';

import withPageLayout from '../components/PageLayout';
import { getGhostPostBySlug } from '../lib/ghost';
import { getTags } from '../lib/api';
import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import moment from 'moment';
import TagList from '../components/TagList';
import { generateImgPropsFromServingUrl } from '../components/Image';

const IMAGE_URL_REGEX = /<img.*src="(https:\/\/lh3\.googleusercontent\.com.*?)".*?>/gm;

const replaceImages = html => {
  let newHtml = html;
  let indexOffset = 0;
  let match;
  while ((match = IMAGE_URL_REGEX.exec(html)) !== null) {
    const { src, srcSet, sizes } = generateImgPropsFromServingUrl(
      match[1],
      [360, 640, 1000, 2000],
      '(max-width: 900px) calc(100vw - 4em), 716px'
    );
    const newImg = `<img src="${src}" srcset="${srcSet}" sizes="${sizes}">`;
    newHtml =
      newHtml.slice(0, match.index + indexOffset) +
      newImg +
      newHtml.slice(match.index + match[0].length + indexOffset);
    indexOffset = indexOffset + (newImg.length - match[0].length);
  }
  return newHtml;
};

function ArticlePage(props) {
  const { ghostPage, tags, citySlug, countrySlug } = props;
  const baseUrl = `/${countrySlug}/${citySlug}`;

  const { title, html, feature_image, created_at, tags: ghostTags } = ghostPage;

  return (
    <main>
      <article>
        <header className={'banner'}>
          <img
            {...generateImgPropsFromServingUrl(
              feature_image,
              [640, 1000, 2000],
              '(max-width: 900px) 100vw, max(calc(60vh * 1.5), 576px)',
              title
            )}
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
        <div
          className="article-content content"
          dangerouslySetInnerHTML={{ __html: replaceImages(html) }}
        />
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
        .banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
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
            height: 60vh;
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
      `}</style>
    </main>
  );
}

ArticlePage.getInitialProps = async ctx => {
  const { article, citySlug, countrySlug } = ctx.query;
  return {
    citySlug,
    countrySlug,
    ghostPage: await getGhostPostBySlug(article, {
      query: { include: 'tags' },
    }),
    tags: (await getTags()).results,
  };
};

export default withPageLayout(ArticlePage);
