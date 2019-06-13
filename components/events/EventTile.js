import Link from 'next/link';
import React from 'react';
import css from 'styled-jsx/css';

import Tile from '../Tile';

function EventTile(props) {
  const {
    baseUrl,
    event,
    imgWidths,
    imgSizes,
    className,
    styles = null,
    height = '8em',
  } = props;
  const { title, facebook = {}, images = [], id } = event;
  const imgProps = !!images.length && {
    url: images[0].url,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title || facebook.title,
  };
  return (
    <Link href={`${baseUrl}/${id}`}>
      <a className={className}>
        <Tile
          title={title || facebook.title}
          imgProps={imgProps || {}}
          /*language=CSS*/
          {...css.resolve`
            .top {
              height: ${height};
            }
          `}
        />
        {styles}
      </a>
    </Link>
  );
}

export default EventTile;
