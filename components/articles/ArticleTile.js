import Link from 'next/link';
import React from 'react';
import css from 'styled-jsx/css';

import Tile from '../Tile';

function ArticleTile(props) {
  const { baseUrl, article, style, imgWidths, imgSizes } = props;
  const { title, slug, feature_image } = article;
  let imgProps = {
    url: feature_image,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title,
  };
  return (
    <React.Fragment>
      <Link href={`${baseUrl}/${slug}`}>
        <a style={style}>
          <Tile
            title={title}
            imgProps={imgProps}
            /*language=CSS*/
            {...css.resolve`
              .top {
                height: 10em;
              }
            `}
          />
        </a>
      </Link>
    </React.Fragment>
  );
}

export default ArticleTile;
