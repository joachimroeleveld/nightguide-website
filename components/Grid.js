import { Fragment, useState, useEffect, useRef } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import dimensions from '../styles/dimensions';

function FiniteGrid(props) {
  const {
    className,
    itemHeight,
    keyExtractor,
    renderItem,
    items,
    setGridItemRef,
  } = props;
  return (
    <Fragment>
      <div className={`grid ${className}`}>
        {items.map((item, index) => (
          <div
            key={(keyExtractor && keyExtractor(item)) || index}
            style={{ height: itemHeight }}
            ref={ref => setGridItemRef && setGridItemRef(index, ref)}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .grid {
          display: grid;
          grid-gap: ${dimensions.gridGap};
        }
      `}</style>
    </Fragment>
  );
}

function InfiniteGrid(props) {
  const {
    totalCount,
    getItems,
    renderItem,
    keyExtractor,
    className,
    itemHeight,
    usePage,
    setGridItemRef,
  } = props;

  const page = useRef(0);
  const [offset, setOffset] = useState(props.items.length);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(null);
  const [items, setItems] = useState(props.items);
  const [itemDimensions, setItemDimensions] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState(null);
  const [endReached, setEndReached] = useState(false);

  // Determine limit and fetch all items within viewport
  useEffect(() => {
    if (itemDimensions && containerDimensions) {
      const itemsInHeight = Math.round(
        window.innerHeight / (itemDimensions.height + 14)
      );
      const itemsInWidth = Math.round(
        containerDimensions.width / itemDimensions.width
      );
      const limit = itemsInHeight * itemsInWidth;

      setLimit(limit);

      if (items.length < limit) {
        getNextPage(usePage, limit);
      }
    }
  }, [itemDimensions, containerDimensions]);

  const getNextPage = async (replace = false, limitOverride) => {
    if (!loading && !endReached) {
      setLoading(true);
      const results = await getItems(
        usePage ? page.current + 1 : offset,
        limitOverride || limit
      );
      setEndReached(
        totalCount
          ? totalCount === items.length + results.length
          : !results.length
      );
      setOffset(offset + results.length);
      setLoading(false);
      setItems(replace ? results : items.concat(results));
      page.current++;
    }
  };

  const onIntersect = ({ isIntersecting }) => {
    if (isIntersecting) {
      getNextPage();
    }
  };

  const setContainerRef = ref => {
    if (ref && !containerDimensions) {
      setContainerDimensions(ref.getBoundingClientRect());
    }
  };
  const setEventRef = (index, ref) => {
    if (ref) {
      if (!itemDimensions) {
        setItemDimensions(ref.getBoundingClientRect());
      }
      if (setGridItemRef) {
        setGridItemRef(index, ref);
      }
    }
  };

  return (
    <Fragment>
      <div className={`grid ${className}`} ref={setContainerRef}>
        {items.map((item, index) => (
          <div
            ref={ref => setEventRef(index, ref)}
            key={(keyExtractor && keyExtractor(item)) || index}
            style={{ height: itemHeight }}
          >
            {renderItem(item)}
          </div>
        ))}
        {limit !== null && (
          <Observer onChange={onIntersect} treshold={0.25}>
            <div />
          </Observer>
        )}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .grid {
          display: grid;
          grid-gap: ${dimensions.gridGap};
        }
      `}</style>
    </Fragment>
  );
}

export default function Grid(props) {
  const { infinite } = props;
  if (infinite) {
    return <InfiniteGrid {...props} />;
  } else {
    return <FiniteGrid {...props} />;
  }
}
