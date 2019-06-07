import Link from 'next/link';
import React from 'react';

import Tile from '../Tile';
import { generateImgPropsFromServingUrl } from '../Image';

function VenueTile(props) {
  const { baseUrl, venue, imgWidths, imgSizes } = props;
  const { name, images, id } = venue;
  const imgProps =
    images &&
    images.length &&
    generateImgPropsFromServingUrl(images[0].url, imgWidths, imgSizes);
  return (
    <React.Fragment>
      <Link href={`${baseUrl}/${id}`}>
        <a>
          <Tile title={name} imgProps={imgProps || {}} />
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
