import React from 'react';
import css from 'styled-jsx/css';

import Tile from '../Tile';
import { _o } from '../../lib/i18n';
import { removeTags } from '../../lib/util';

function VenueTile(props) {
  const { baseUrl, venue, imgWidths, imgSizes } = props;
  const { name, images, id, description } = venue;
  return (
    <Tile
      href={`${baseUrl}/${id}`}
      title={name}
      imgProps={
        !!images.length && {
          url: images[0].url,
          widths: imgWidths,
          sizes: imgSizes,
          alt: name,
        }
      }
      BodyContents={
        description ? (
          <div>
            {removeTags(_o(description))
              .slice(0, 130)
              .trim() + '...'}
          </div>
        ) : null
      }
      /*language=CSS*/
      {...css.resolve`
        .top {
          height: 10em;
        }
      `}
    />
  );
}

export default VenueTile;
