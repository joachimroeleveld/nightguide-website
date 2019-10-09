import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { Link } from '../../routes';
import __, { _o } from '../../lib/i18n';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';
import ResponsiveImage from '../ResponsiveImage';
import dimensions from '../../styles/dimensions';
import { useMatchMedia, useWindowWidth } from '../../lib/hooks';
import { classNames } from '../../lib/util';
import find from 'lodash/find';
import ticketProviders from './ticket-providers';
import EventTicketModal from './EventTicketModal';

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
  const artists =
    date.artists && date.artists.length ? date.artists : event.artists || [];
  const ticketsUrl = date.ticketsUrl || (tickets && tickets.checkoutUrl);
  const ticketProvider =
    tickets.provider && find(ticketProviders, { id: tickets.provider });

  const windowWidth = useWindowWidth();
  const isWide = wideQuery && useMatchMedia(wideQuery);
  const [showTicketModal, setShowTicketModal] = useState(false);

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
  const hasTicketButton =
    ticketsUrl || (ticketProvider && date.providerEventId);

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
        hasTicketButton && 'has-tickets',
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
          {hasTicketButton && (
            <div className="tickets">
              {ticketsUrl && (
                <a
                  className="button"
                  href={generateTicketRedirectUrl(event.id, dateIndex)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {__('EventTile.tickets')}
                </a>
              )}
              {ticketProvider && date.providerEventId && (
                <button
                  className="button"
                  onClick={() => setShowTicketModal(true)}
                >
                  {__('EventTile.tickets')}
                </button>
              )}
            </div>
          )}
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
        {!!date.providerEventId && (
          <EventTicketModal
            ticketProvider={tickets.provider}
            eventId={date.providerEventId}
            providerData={tickets.providerData}
            isOpen={showTicketModal}
            onClose={() => setShowTicketModal(false)}
          />
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
          width: 99%;
        }
        .has-tickets .title-date-location {
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
        .tickets .button {
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
