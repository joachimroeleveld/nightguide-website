import Link from 'next/link';
import React from 'react';

import Tile from '../Tile';

function VenueTile(props) {
  const { baseUrl, venue, imgWidths, imgSizes } = props;
  const { name, images, id } = venue;
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
