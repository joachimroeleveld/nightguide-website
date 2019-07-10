import React, { useState, memo, useMemo } from 'react';
import css from 'styled-jsx/css';

import __, { _o } from '../../lib/i18n';
import Tile from '../Tile';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';
import VideoModal from '../VideoModal';

const EventTileBody = props => {
  const { event, eventUrl } = props;
  const { date, tags, organiser, tickets = {}, dateIndex } = event;

  return (
    <div className="container">
      <a href={eventUrl} className="event-link">
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
      {tickets.checkoutUrl && (
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
  const { baseUrl, event, imgWidths, imgSizes, height = '8em' } = props;
  const { title, facebook = {}, images = [], id, videoUrl } = event;

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

  const eventUrl = `${baseUrl}/${id}`;

  return (
    <div className="container">
      <Tile
        title={title || facebook.title}
        imgProps={imgProps}
        href={eventUrl}
        linkBody={false}
        /*language=CSS*/
        {...css.resolve`
          .top {
            height: ${height};
          }
        `}
        BodyContents={<EventTileBody eventUrl={eventUrl} event={event} />}
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
          width: 50px;
          height: 37px;
          background-image: linear-gradient(
            212deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 50%
          );
          display: flex;
          justify-content: flex-end;
        }
        .video-button button {
          width: 100%;
          height: 100%;
          padding: 0.3em;
          background: url(/static/img/video-icon.svg) no-repeat right 0.5em top
            0.5em;
          background-size: 45%;
        }
      `}</style>
    </div>
  );
}

export default memo(EventTile);
