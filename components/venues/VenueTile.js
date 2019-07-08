import Link from 'next/link';
import React from 'react';
import css from 'styled-jsx/css';

import Tile from '../Tile';
import { _o } from '../../lib/i18n';

function VenueTile(props) {
  const { baseUrl, venue, imgWidths, imgSizes } = props;
  const { name, images, id, description } = venue;
  return (
    <React.Fragment>
      <Link href={`${baseUrl}/${id}`}>
        <a>
          <Tile
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
                  {_o(description)
                    .replace(/(<([^>]+)>)/gi, '')
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
        </a>
      </Link>
      {/*language=CSS*/}
      <style jsx>{`
        a {
          height: 100%;
        }
      `}</style>
    </React.Fragment>
  );
}

export default VenueTile;
