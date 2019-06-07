import Link from 'next/link';
import React from 'react';

import Tile from '../Tile';
import { generateImgPropsFromServingUrl } from '../Image';

function ArticleTile(props) {
  const { baseUrl, article, style, imgWidths, imgSizes } = props;
  const { title, slug, feature_image } = article;
  let imgProps = generateImgPropsFromServingUrl(
    feature_image,
    imgWidths,
    imgSizes,
    title
  );
  return (
    <React.Fragment>
      <Link href={`${baseUrl}/${slug}`}>
        <a style={style}>
          <Tile title={title} imgProps={imgProps} />
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

export default ArticleTile;
