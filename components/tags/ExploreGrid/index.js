import React, { Fragment } from 'react';
import css from 'styled-jsx/css';
import find from 'lodash/find';

import { Link } from '../../../routes';
import { _o } from '../../../lib/i18n';
import dimensions from '../../../styles/dimensions';
import colors from '../../../styles/colors';
import Grid from '../../Grid';
import TAG_CONFIG from './tagConfig';
import ResponsiveImage from '../../ResponsiveImage';

function ExploreGrid(props) {
  const { tags, limitItems = null, routeParams } = props;

  const sortedTags = TAG_CONFIG.order
    .map(slug => find(tags, { slug }))
    .concat(tags.filter(tag => !TAG_CONFIG.order.includes(tag.slug)))
    .filter(tag => !!tag)
    .slice(0, limitItems ? limitItems : tags.length);

  const keyExtractor = tag => tag.id;

  const renderItem = tag => {
    const tagConfig = TAG_CONFIG[tag.slug];

    return (
      <Link key={tag.id} route="tag" params={{ ...routeParams, tag: tag.slug }}>
        <a className="tag">
          {!!tagConfig && (
            <div className="bg-img">
              <ResponsiveImage
                url={TAG_CONFIG[tag.slug].imageUrl}
                widths={[215, 500, 1000]}
                sizes={
                  '(max-width: 41rem) calc(50vw - 39px), (max-width: 56rem) calc(33vw - 20px), 214px'
                }
                alt={_o(tag.name)}
                showOverlay={true}
                scale={true}
                /*language=CSS*/
                {...css.resolve`
                    .container {
                      display: block;
                      width: 100%;
                      height: 100%;
                    }
                    .overlay {
                      border-radius: ${dimensions.tileRadius};
                      background-image: linear-gradient(
                        231deg,
                        rgba(0, 0, 0, 0) 28%,
                        #000000 99%
                      );
                    }
                  `}
              />
            </div>
          )}
          <span className="name">{_o(tag.name)}</span>
          {/*language=CSS*/}
          <style jsx>{`
            .tag {
              padding: ${dimensions.tilePadding};
              display: flex;
              align-items: center;
              height: 6em;
              box-sizing: border-box;
              border-radius: ${dimensions.tileRadius};
              position: relative;
              box-shadow: ${colors.tileShadow};
            }
            .bg-img {
              position: absolute;
              border-radius: ${dimensions.tileRadius};
              overflow: hidden;
              left: 0;
              top: 0;
              opacity: 0.8;
              width: 100%;
              height: 100%;
            }
            .name {
              position: relative;
              z-index: 1;
            }
          `}</style>
        </a>
      </Link>
    );
  };

  return (
    <Fragment>
      <Grid
        renderItem={renderItem}
        items={sortedTags}
        keyExtractor={keyExtractor}
        className={gridStyles.className}
      />
      {gridStyles.styles}
    </Fragment>
  );
}

//language=CSS
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

export default ExploreGrid;
