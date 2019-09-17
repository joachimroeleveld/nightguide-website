import React, { memo, useMemo } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';

import { Link } from '../../routes';
import __, { _o } from '../../lib/i18n';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';
import ResponsiveImage from '../ResponsiveImage';
import dimensions from '../../styles/dimensions';
import { useMatchMedia, useWindowWidth } from '../../lib/hooks';
import { classNames } from '../../lib/util';

EventTile.propTypes = {
  event: PropTypes.object.isRequired,
  imgWidths: PropTypes.arrayOf(PropTypes.string).isRequired,
  imgSizes: PropTypes.string,
  routeParams: PropTypes.object,
  wideQuery: PropTypes.string,
};

function EventTile(props) {
  const { wideQuery = null, event, imgWidths, imgSizes, routeParams } = props;

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
  const { artists = [] } = date;

  const windowWidth = useWindowWidth();
  const isWide = wideQuery && useMatchMedia(wideQuery);

  const imgProps = useMemo(
    () =>
      images.length
        ? {
            url: images[0].url,
            widths: imgWidths,
            sizes: imgSizes,
            alt: title || facebook.title,
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

  return (
    <div className={classNames(['container', isWide && 'wide'])}>
      <div className="img">
        <Link route="event" params={linkParams}>
          <a {...aProps}>
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
        <div className="top">
          <div className="title-date-location">
            <Link route="event" params={linkParams}>
              <a {...aProps}>
                <h3 className="title">{title || facebook.title}</h3>
                <div className="date">{formatEventDate(date.from)}</div>
                <span className="venue">{organiser.venue.name}</span>
              </a>
            </Link>
          </div>
          {tickets.checkoutUrl && (
            <div className="tickets">
              <a
                rel="nofollow"
                target="_blank"
                href={generateTicketRedirectUrl(event.id, dateIndex)}
                className="buy-tickets"
              >
                {__('EventTile.tickets')}
              </a>
            </div>
          )}
        </div>
        <div className="music">
          {!!tags.length && (
            <span className="tags">
              {tags.map(tag => _o(tag.name)).join(', ')}
            </span>
          )}
          {!!artists.length && (
            <span className="artists">
              {!!tags.length && ' - '}
              {artists
                .map(artist => artist.name)
                .slice(0, 3)
                .join(', ')}
              {artists.length > 3
                ? ' ' + __('EventTile.andNOthers', { n: artists.length - 3 })
                : ''}
            </span>
          )}
        </div>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          background: ${colors.tileBg};
          box-shadow: ${colors.tileShadow};
          border-radius: ${dimensions.tileRadius};
          font-size: 0.928em;
        }
        .container.wide {
          display: grid;
          grid-template-columns: 25% 75%;
        }
        .body {
          height: 8.4em;
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
          width: calc(100% - 5em);
        }
        .tickets {
          width: 5em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .music {
          line-height: 1.3em;
          padding-left: 1.5em;
          background: url(/static/img/event-tile-music.svg) left top 0.25em
            no-repeat;
          color: #b7b7b7;
        }
        .img {
          overflow: hidden;
          border-top-left-radius: ${dimensions.tileRadius};
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
          margin-bottom: 0.1em;
        }
        .venue {
          color: #b7b7b7;
          margin-bottom: 0.1em;
          padding-left: 1.5em;
          background: url(/static/img/event-tile-location.svg) left 0.1em center
            no-repeat;
        }
        .date,
        .venue {
          line-height: 1.8em;
        }
        .buy-tickets {
          border: 1px solid #686868;
          display: block;
          color: #fff;
          text-align: center;
          border-radius: 3px;
          font-size: inherit;
          box-sizing: border-box;
          padding: 0.25em 0.5em;
          margin: 0.5em 0 0.3em;
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
