import Link from 'next/link';
import React from 'react';

import Tile from '../Tile';
import { generateImgPropsFromServingUrl } from '../Image';

function EventTile(props) {
  const { baseUrl, event, imgWidths, imgSizes } = props;
  const { title, facebook = {}, images = [], id } = event;
  const imgProps =
    !!images.length &&
    generateImgPropsFromServingUrl(
      images[0].url,
      imgWidths,
      imgSizes,
      title || facebook.title
    );
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
