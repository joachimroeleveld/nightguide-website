import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useSelector } from 'react-redux';

import { Link } from '../../routes';
import __, { _o } from '../../lib/i18n';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import ResponsiveImage from '../ResponsiveImage';
import dimensions from '../../styles/dimensions';
import { useWindowWidth } from '../../lib/hooks';
import { classNames } from '../../lib/util';
import { formatAmount } from '../../lib/currencies';
import { getCurrency } from '../../state/shop';

EventTile.propTypes = {
  event: PropTypes.object.isRequired,
  imgWidths: PropTypes.arrayOf(PropTypes.string).isRequired,
  imgSizes: PropTypes.string,
  routeParams: PropTypes.object,
  isWide: PropTypes.bool,
};

function EventTile(props) {
  const { event, imgWidths, imgSizes, routeParams, isWide } = props;

  const currency = useSelector(getCurrency);

  const {
    organiser,
    tickets = {},
    title,
    facebook = {},
    images = [],
    id,
    dateIndex = 0,
    dates,
    tags = [],
  } = event;

  let date;
  if (dates) {
    date = dates[dateIndex];
  } else {
    date = event.date;
  }
  const artists =
    date.artists && date.artists.length ? date.artists : event.artists || [];

  const windowWidth = useWindowWidth();

  const imgProps = useMemo(
    () =>
      images.length
        ? {
            url: images[0].url,
            widths: imgWidths,
            sizes: imgSizes,
            alt: title || facebook.title,
            width: images[0].width,
            height: images[0].height,
          }
        : undefined,
    [images]
  );

  const linkParams = useMemo(
    () => ({
      ...routeParams,
      event: id,
      dateIndex,
    }),
    [id, routeParams, dateIndex]
  );

  const aProps = windowWidth > 800 ? { target: '_blank' } : {};

  const tagNames = tags.map(tag => _o(tag.name)).join(', ');
  const artistNames = artists
    .map(artist => artist.name)
    .slice(0, 3)
    .join(', ');

  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  return (
    <div
      className={classNames([
        'container',
        isWide && 'wide',
        date.isHot && 'hot',
      ])}
    >
      <div className="img">
        {!!images.length && (
          <Link route="event" params={linkParams}>
            <a {...aProps}>
              <ResponsiveImage scale={true} {...imgProps} />
            </a>
          </Link>
        )}
      </div>
      <div className="body">
        <div className="top">
          <div className="title-date-location">
            <Link route="event" params={linkParams}>
              <a {...aProps}>
                <h3 className="title">{title || facebook.title}</h3>
                <div className="date">{formatEventDate(date.from)}</div>
                <div className="venue">{organiser.venue.name}</div>
              </a>
            </Link>
          </div>
          {(tickets.products && tickets.products.length) ||
            (tickets.displayPrice && (
              <div className="price">
                {formatAmount(
                  tickets.displayPrice || tickets.products[0].price,
                  currency,
                  0
                )}
              </div>
            ))}
        </div>
        {(tagNames || artistNames) && (
          <div className="music">
            <Link route="event" params={linkParams}>
              <a {...aProps}>
                <ResponsiveEllipsis
                  text={`${tagNames}${artistNames &&
                    tagNames &&
                    ' - '}${artistNames}${
                    artists.length > 3
                      ? ' ' +
                        __('EventTile.andNOthers', { n: artists.length - 3 })
                      : ''
                  }`}
                  maxLine={2}
                  ellipsis="..."
                />
              </a>
            </Link>
          </div>
        )}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          background: ${colors.tileBg};
          box-shadow: ${colors.tileShadow};
          border-radius: ${dimensions.tileRadius};
          font-size: 0.928em;
          position: relative;
        }
        .container.wide {
          display: grid;
          grid-template-columns: 25% 75%;
        }
        .body {
          height: 8.7em;
          padding: 0 ${dimensions.tilePadding} ${dimensions.tilePadding};
        }
        .top {
          display: flex;
        }
        .title {
          margin: 0 0 0.1em;
          height: 1.4em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .title-date-location {
          padding: ${dimensions.tilePadding} 0.5em 0 0;
          box-sizing: border-box;
          width: calc(100% - 3em);
        }
        .price {
          width: 3em;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
        }
        .wide .price {
          position: absolute;
          right: ${dimensions.tilePadding};
          height: 100%;
        }
        .music {
          line-height: 1.3em;
          padding-left: 1.5em;
          background: url(/static/img/event-tile-music.svg) left top 0.25em
            no-repeat;
          color: #b7b7b7;
        }
        .img {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-top-left-radius: ${dimensions.tileRadius};
          background: ${colors.imagePlaceholder};
        }
        .img a,
        .img :global(.container) {
          display: block;
          width: 100%;
          height: 100%;
        }
        .wide .img {
          border-bottom-left-radius: ${dimensions.tileRadius};
        }
        :not(.wide) .img {
          height: 8em;
          border-top-right-radius: ${dimensions.tileRadius};
        }
        .date {
          color: ${colors.yellowTextColor};
          margin-bottom: 0.5em;
        }
        .venue {
          color: #b7b7b7;
          margin-bottom: 0.35em;
          line-height: 1.3em;
          padding-left: 1.5em;
          background: url(/static/img/event-tile-location.svg) left 0.1em center
            no-repeat;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .hot:after {
          content: '';
          position: absolute;
          right: 1em;
          top: 0;
          background: url(/static/img/event-badge-hot.svg);
          background-size: cover;
          width: 2.2em;
          height: 2.9em;
        }
        @media (min-width: 800px) {
          .container {
            font-size: 0.875em;
          }
          .title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(EventTile);
