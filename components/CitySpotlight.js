import css from 'styled-jsx/css';

import dimensions from '../styles/dimensions';
import EventTile from './events/EventTile';

export function CitySpotlight(props) {
  const { eventIds, events, baseUrl } = props;
  /*language=CSS*/
  const tileStyles = css.resolve`
    a {
      height: 100%;
    }
  `;
  return (
    <div className="container">
      <div className="event-1">
        <EventTile
          baseUrl={baseUrl + '/events'}
          imgWidths={[588, 1000, 1500]}
          imgSizes="(max-width: 41rem) calc(100vw - 4em), (max-width: 960px) calc(66vw - (2em * 2 + 14px) / 3 * 2), 588px"
          event={events[0] || { id: eventIds[0] }}
          height={'100%'}
          {...tileStyles}
        />
      </div>
      {[2, 3].map(event => (
        <div key={event} className={`event-${event}`}>
          <EventTile
            baseUrl={baseUrl + '/events'}
            imgWidths={[294, 640, 1200]}
            imgSizes="(max-width: 41rem) calc(50vw - 2em), (max-width: 960px) calc(33vw - (2em * 2 + 14px) / 3 * 1), 294px"
            event={events[event - 1] || { id: eventIds[event - 1] }}
            height={'100%'}
            {...tileStyles}
          />
        </div>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: grid;
          min-height: 20em;
          grid-template-rows: 2fr 1fr;
          grid-template-columns: 1fr 1fr;
          grid-gap: ${dimensions.gridGap};
        }
        .event-1 {
          grid-area: 1 / 1 / 2 / 3;
        }
        @media (min-width: 41rem) {
          .container {
            grid-template-rows: auto;
            grid-template-columns: 2fr 1fr;
          }
          .event-1 {
            grid-area: 1 / 1 / 3 / 2;
          }
        }
      `}</style>
    </div>
  );
}
