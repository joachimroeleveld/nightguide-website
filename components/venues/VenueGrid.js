import React from 'react';
import css from 'styled-jsx/css';

import Grid from '../Grid';
import VenueTile from './VenueTile';

function VenueGrid(props) {
  const { venues, baseUrl, ...gridProps } = props;

  const keyExtractor = venue => venue.id;

  const renderItem = venue => (
    <div key={venue.id} className="venue">
      <VenueTile
        imgWidths={[290, 580, 1000, 2000]}
        imgSizes={
          '(max-width: 41rem) calc(100vw - 64px), (max-width: 56rem) calc(50vw - 39px), 290px'
        }
        venue={venue}
        baseUrl={`${baseUrl}/venues`}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .venue {
          height: 10em;
        }
      `}</style>
    </div>
  );

  return (
    <React.Fragment>
      <Grid
        {...gridProps}
        keyExtractor={keyExtractor}
        items={venues}
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
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 41rem) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 56rem) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default VenueGrid;
