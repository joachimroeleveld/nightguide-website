import React from 'react';
import css from 'styled-jsx/css';

import Grid from '../Grid';
import VenueTile from './VenueTile';

function VenueGrid(props) {
  const { venues, routeParams, ...gridProps } = props;

  const keyExtractor = venue => venue.id;

  const renderItem = venue => (
    <VenueTile
      key={venue.id}
      imgWidths={[290, 580, 1000, 2000]}
      imgSizes={'(max-width: 41rem) 9.2em, 10.81em'}
      venue={venue}
      routeParams={routeParams}
    />
  );

  const styles = getStyles(venues.length);

  return (
    <React.Fragment>
      <Grid
        {...gridProps}
        keyExtractor={keyExtractor}
        items={venues}
        renderItem={renderItem}
        className={styles.className}
      />
      {styles.styles}
    </React.Fragment>
  );
}

/*language=CSS*/
const getStyles = columns => css.resolve`
  .grid {
    grid-template-columns: repeat(${columns}, 9.2em);
  }
  @media (min-width: 41rem) {
    .grid {
      grid-template-columns: repeat(${columns}, 10.81em);
    }
  }
`;

export default VenueGrid;
