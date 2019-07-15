import React from 'react';
import css from 'styled-jsx/css';

import Grid from '../Grid';
import ArticleTile from './ArticleTile';

function ArticleGrid(props) {
  const { routeParams, articles, ...gridProps } = props;

  const keyExtractor = article => article.id;

  const renderItem = article => (
    <div key={article.id} className="article">
      <ArticleTile
        imgWidths={[290, 580, 1000, 2000]}
        imgSizes={
          '(max-width: 41rem) calc(100vw - 64px), (max-width: 56rem) calc(50vw - 39px), 290px'
        }
        article={article}
        routeParams={routeParams}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Grid
        {...gridProps}
        usePage={true}
        keyExtractor={keyExtractor}
        items={articles}
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

export default ArticleGrid;
