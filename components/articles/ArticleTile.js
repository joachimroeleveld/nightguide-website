import React from 'react';
import css from 'styled-jsx/css';
import Tile from '../Tile';

function ArticleTile(props) {
  const { routeParams, article, imgWidths, imgSizes } = props;
  const { title, feature_image, slug } = article;

  let imgProps = {
    url: feature_image,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title,
  };

  return (
    <Tile
      route="article"
      routeParams={{ ...routeParams, article: slug }}
      title={title}
      imgProps={imgProps}
      /*language=CSS*/
      {...css.resolve`
        .top {
          height: 10em;
        }
      `}
    />
  );
}

export default ArticleTile;
