import React, { memo, useMemo } from 'react';
import css from 'styled-jsx/css';

import Tile from '../Tile';
import { _o } from '../../lib/i18n';
import { removeTags } from '../../lib/util';

function VenueTile(props) {
  const { routeParams, venue, imgWidths, imgSizes } = props;
  const { name, images, id, description } = venue;

  const linkParams = useMemo(() => ({ ...routeParams, venue: id }), [
    id,
    routeParams,
  ]);

  const imgProps = useMemo(
    () =>
      !!images.length && {
        url: images[0].url,
        widths: imgWidths,
        sizes: imgSizes,
        alt: name,
      },
    [images, imgSizes, imgWidths, name]
  );

  return (
    <Tile
      route="venue"
      routeParams={linkParams}
      title={name}
      imgProps={imgProps}
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

export default memo(VenueTile);
