import React, { memo, useMemo } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';

import ResponsiveImage from '../ResponsiveImage';
import DistanceIndicator from '../DistanceIndicator';
import { Link } from '../../routes';
import { useWindowWidth } from '../../lib/hooks';

VenueTile.propTypes = {
  routeParams: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  imgWidths: PropTypes.arrayOf(PropTypes.number),
  imgSizes: PropTypes.string,
};

function VenueTile(props) {
  const { routeParams, venue, imgWidths, imgSizes } = props;
  const { name, images, id, location } = venue;

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

  const windowWidth = useWindowWidth();

  // const aProps = windowWidth > 800 ? { target: '_blank' } : {};

  return (
    <div className="container">
      <div className="img">
        <Link route="events" params={linkParams}>
          <a>
            <ResponsiveImage
              scale={true}
              /*language=CSS*/
              {...css.resolve`
            .container {
              display: block;
              width: 100%;  
              height: 100%;
            }
          `}
              {...imgProps}
            />
          </a>
        </Link>
      </div>
      <div className="body">
        <Link route="events" params={linkParams}>
          <a>
            <h3>{name}</h3>
            <div className="distance">
              <DistanceIndicator {...location.coordinates} />
            </div>
          </a>
        </Link>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .img {
          height: 9em;
          overflow: hidden;
        }
        h3 {
          margin: 0.4em 0 0.2em;
          line-height: 1.3em;
        }
        .distance {
          font-size: 0.9em;
        }
        @media (min-width: 800px) {
          .img {
            height: 10.81em;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(VenueTile);
