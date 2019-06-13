import React from 'react';
import css from 'styled-jsx/css';

import Grid from '../Grid';
import EventTile from './EventTile';

function EventGrid(props) {
  const { events, baseUrl, ...gridProps } = props;

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
    </div>
  );

  return (
    <React.Fragment>
      <Grid
        {...gridProps}
        keyExtractor={keyExtractor}
        items={events}
        renderItem={renderItem}
        className={gridStyles.className}
      />
      {gridStyles.styles}
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

export default EventGrid;
