import React from 'react';
import css from 'styled-jsx/css';

import Grid from '../Grid';
import EventTile from './EventTile';

function EventGrid(props) {
  const { events, baseUrl, double, ...gridProps } = props;

  const keyExtractor = event => event.id;

  const renderItem = event => (
    <div key={event.id} className="event">
      <EventTile
        imgWidths={[215, 320]}
        imgSizes={
          '(max-width: 41rem) calc(50vw - 39px), (max-width: 56rem) calc(33vw - 20px), 214px'
        }
        event={event}
        baseUrl={`${baseUrl}/events`}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .event {
          height: 100%;
        }
      `}</style>
    </div>
  );

  const styles = double ? gridStylesDouble : gridStyles;

  return (
    <React.Fragment>
      <Grid
        {...gridProps}
        keyExtractor={keyExtractor}
        items={events}
        renderItem={renderItem}
        className={styles.className}
      />
      {!double && styles.styles}
      {double && styles.styles}
    </React.Fragment>
  );
}

/*language=CSS*/
const gridStyles = css.resolve`
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 41rem) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 56rem) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

/*language=CSS*/
const gridStylesDouble = css.resolve`
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 56rem) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
  }
`;

export default EventGrid;
