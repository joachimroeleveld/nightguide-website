import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import css from 'styled-jsx/css';

import { Link } from '../../routes';
import { _o } from '../../lib/i18n';
import ResponsiveImage from '../ResponsiveImage';
import colors from '../../styles/colors';

ArticleTile.propTypes = {
  article: PropTypes.object,
  routeParams: PropTypes.object,
};

function ArticleTile(props) {
  const { routeParams, article, imgWidths, imgSizes } = props;
  const { title, images, urlSlugs, thumbnail } = article;

  const image = thumbnail && find(images, { id: thumbnail });
  const url = urlSlugs[0];
  const linkParams = { ...routeParams, article: url };

  return (
    <article>
      <Link route="article" params={linkParams}>
        <a>
          <figure className="img">
            {image && image.url && (
              <ResponsiveImage
                scale={true}
                url={image.url}
                widths={imgWidths}
                sizes={imgSizes}
                /*language=CSS*/
                {...css.resolve`
                  .container {
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                `}
              />
            )}
          </figure>
          <h3>{_o(title)}</h3>
        </a>
      </Link>
      {/*language=CSS*/}
      <style jsx>{`
        .img {
          background: ${colors.imagePlaceholder};
          height: 8em;
          overflow: hidden;
        }
        h3 {
          margin: 0.4em 0;
        }
      `}</style>
    </article>
  );
}

export default ArticleTile;
