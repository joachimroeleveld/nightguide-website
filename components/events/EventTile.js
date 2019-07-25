import React, { useState, memo, useMemo } from 'react';
import css from 'styled-jsx/css';

import { Link } from '../../routes';
import __, { _o } from '../../lib/i18n';
import Tile from '../Tile';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';
import VideoModal from '../VideoModal';

const EventTileBody = props => {
  const { event, routeParams, showBuy } = props;
  const { id, date, tags, organiser, tickets = {}, dateIndex } = event;

  return (
    <div className="container">
      <Link route="event" params={routeParams}>
        <a className="event-link">
          <div className="date">{formatEventDate(date.from)}</div>
          <div className="venue">{organiser.venue.name}</div>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={tag.id} className="tag">
                {(index !== 0 ? ' • ' : '') + _o(tag.name)}
              </span>
            ))}
          </div>
        </a>
      </Link>
      {tickets.checkoutUrl && showBuy && (
        <a
          rel="nofollow"
          target="_blank"
          href={generateTicketRedirectUrl(event.id, dateIndex)}
          className="buy-tickets"
        >
          {__('buyTickets')}
        </a>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .venue {
          color: #fff;
          margin: 0.1em 0;
        }
        .date {
          color: ${colors.yellowTextColor};
          text-transform: uppercase;
          font-size: 0.95em;
        }
        .tags {
          margin-top: 0.2em;
        }
        .event-link {
          display: block;
          flex-grow: 1;
        }
        .buy-tickets {
          background-color: ${colors.primaryButton};
          display: block;
          color: ${colors.textDark};
          text-align: center;
          border-radius: 3px;
          font-size: inherit;
          border: none;
          width: 100%;
          box-sizing: border-box;
          padding: 0.1em 0.3em;
          margin-top: 0.5em;
        }
      `}</style>
    </div>
  );
};

function EventTile(props) {
  const {
    event,
    imgWidths,
    imgSizes,
    height = '8em',
    showBuy = false,
    routeParams,
  } = props;
  const {
    title,
    facebook = {},
    images = [],
    id,
    videoUrl,
    dateIndex = 0,
  } = event;

  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

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

  const linkParams = useMemo(() => ({ ...routeParams, event: id, dateIndex }), [
    id,
    routeParams,
    dateIndex,
  ]);

  return (
    <div className="container">
      <Tile
        title={title || facebook.title}
        imgProps={imgProps}
        route="event"
        routeParams={linkParams}
        linkBody={false}
        /*language=CSS*/
        {...css.resolve`
          .top {
            height: ${height};
          }
        `}
        BodyContents={
          <EventTileBody
            routeParams={linkParams}
            event={event}
            showBuy={showBuy}
          />
        }
      />
      {!!videoUrl && (
        <div className="video-button">
          <button onClick={toggleVideoModal} />
          <VideoModal
            url={videoUrl}
            isOpen={showVideoModal}
            onClose={toggleVideoModal}
            shouldCloseOnOverlayClick={true}
          />
        </div>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
          position: relative;
        }
        .video-button {
          position: absolute;
          right: 0;
          top: 0;
          width: 8em;
          height: 3em;
          background-image: linear-gradient(
            200deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 53%
          );
          display: flex;
          justify-content: flex-end;
        }
        .video-button button {
          width: 7em;
          height: 2.8em;
          padding: 0.3em;
          text-align: left;
          background: url(/static/img/video-icon.svg) no-repeat right 0.5em top
            0.5em;
          background-size: 27px;
        }
      `}</style>
    </div>
  );
}

export default memo(EventTile);
