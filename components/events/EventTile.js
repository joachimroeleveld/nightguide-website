import React from 'react';
import css from 'styled-jsx/css';

import __, { _o } from '../../lib/i18n';
import Tile from '../Tile';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';

const EventTileBody = props => {
  const { event, eventUrl } = props;
  const { date, tags, organiser, tickets = {}, dateIndex } = event;

  return (
    <div className="container">
      <a href={eventUrl}>
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
  const { title, facebook = {}, images = [], id } = event;
  const imgProps = !!images.length && {
    url: images[0].url,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title || facebook.title,
  };
  const eventUrl = `${baseUrl}/${id}`;
  return (
    <Tile
      title={title || facebook.title}
      imgProps={imgProps || {}}
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
  );
}

export default EventTile;
