import Link from 'next/link';
import React from 'react';
import css from 'styled-jsx/css';
import moment from 'moment';

import { _o } from '../../lib/i18n';
import { getFutureEventDates } from '../../lib/events';
import Tile from '../Tile';
import colors from '../../styles/colors';

const EventTileBody = props => {
  const { event } = props;
  const { dates, tags, organiser } = event;
  const futureDates = getFutureEventDates(dates);

  return (
    <div className="container">
      <div className="date">
        {futureDates.length && moment(futureDates[0].from).format('LLL')}
      </div>
      <div className="venue">{organiser.venue.name}</div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={tag.id} className="tag">
            {(index !== 0 ? ' • ' : '') + _o(tag.name)}
          </span>
        ))}
      </div>
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
      `}</style>
    </div>
  );
};

function EventTile(props) {
  const {
    baseUrl,
    event,
    imgWidths,
    imgSizes,
    className,
    styles = null,
    height = '8em',
  } = props;
  const { title, facebook = {}, images = [], id } = event;
  const imgProps = !!images.length && {
    url: images[0].url,
    widths: imgWidths,
    sizes: imgSizes,
    alt: title || facebook.title,
  };
  return (
    <Link href={`${baseUrl}/${id}`}>
      <a className={className}>
        <Tile
          title={title || facebook.title}
          imgProps={imgProps || {}}
          /*language=CSS*/
          {...css.resolve`
            .top {
              height: ${height};
            }
          `}
          BodyContents={<EventTileBody event={event} />}
        />
        {styles}
      </a>
    </Link>
  );
}

export default EventTile;
