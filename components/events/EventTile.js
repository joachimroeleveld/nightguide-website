import Link from 'next/link';
import React from 'react';

import Tile from '../Tile';

function EventTile(props) {
  const { baseUrl, event, imgWidths, imgSizes } = props;
  const { title, facebook = {}, images = [], id } = event;
  const imgProps = !!images.length && {
    url: images[0].url,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title || facebook.title,
  };
  return (
    <React.Fragment>
      <Link href={`${baseUrl}/${id}`}>
        <a>
          <Tile title={title || facebook.title} imgProps={imgProps || {}} />
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

export default EventTile;
