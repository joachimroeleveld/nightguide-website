import React, { memo, useMemo, useState } from 'react';
import css from 'styled-jsx/css';

import { Link } from '../../routes';
import __ from '../../lib/i18n';
import Tile from '../Tile';
import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { generateTicketRedirectUrl } from './util';
import { useOnClickOutside, useToggleState } from '../../lib/hooks';
import ArtistList from '../tags/ArtistList';
import dimensions from '../../styles/dimensions';
import { TileButton } from '../TileButton';

const EventTileBody = props => {
  const { event, routeParams, showBuy } = props;
  const { date, organiser, tickets = {}, dateIndex } = event;
  const { artists = [] } = date;

  const [showArtists, toggleShowArtists] = useToggleState(false);
  const [artistRef, setArtistsRef] = useState(null);

  useOnClickOutside(artistRef, toggleShowArtists);

  return (
    <div className="container">
      {showArtists && (
        <div className="artists" ref={setArtistsRef}>
          <div className="close">
            <button onClick={toggleShowArtists} />
          </div>
          <div className="list">
            <ArtistList routeParams={routeParams} artists={artists} />
          </div>
        </div>
      )}
      <Link route="event" params={routeParams}>
        <a className="event-link" target="_blank">
          <div className="date">{formatEventDate(date.from)}</div>
          <div className="venue">{organiser.venue.name}</div>
        </a>
      </Link>
      {!!artists.length && (
        <div className="artists-toggle">
          <TileButton
            onClick={toggleShowArtists}
            title={
              (artists.length === 1 && __('EventTile.oneArtist')) ||
              (artists.length > 1 &&
                __('EventTile.nArtists', { n: artists.length }))
            }
          />
        </div>
      )}
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
        .artists {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% - 0.4em);
          height: calc(100% - 0.4em);
          box-sizing: border-box;
          background: ${colors.bg};
          padding: 0 ${dimensions.tilePadding};
          margin: 0.2em;
          z-index: 10;
          overflow-y: auto;
          border-radius: ${dimensions.tileRadius};
        }
        .artists-toggle {
          position: absolute;
          top: 0.5em;
          right: 0.5em;
        }
        .artists-toggle :global(.button) {
          padding-right: 1.4em;
        }
        .artists-toggle :global(.button):after {
          position: absolute;
          top: 50%;
          margin-top: -1px;
          right: 0.6em;
          content: '';
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 3px solid #fff;
        }
        .artists .close {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.5em;
          margin-top: ${dimensions.tilePadding};
        }
        .artists .list {
          margin-bottom: ${dimensions.tilePadding};
        }
        .artists .close button {
          width: 23px;
          height: 23px;
          background: url(/static/img/close.svg) no-repeat center center;
          background-size: cover;
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
          border-radius: 12px;
          font-size: inherit;
          border: none;
          width: 100%;
          box-sizing: border-box;
          padding: 0.1em 0.3em;
          margin: 0.5em 0 0.3em;
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
  const { title, facebook = {}, images = [], id, dateIndex = 0 } = event;

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
        aProps={{ target: '_blank' }}
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
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          height: 100%;
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default memo(EventTile);
