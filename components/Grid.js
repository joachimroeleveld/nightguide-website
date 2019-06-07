import { Fragment, useState, useEffect } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import dimensions from '../styles/dimensions';

function FiniteGrid(props) {
  const { className, itemHeight, keyExtractor, renderItem, items } = props;
  return (
    <Fragment>
      <div className={`grid ${className}`}>
        {items.map((item, index) => (
          <div
            key={(keyExtractor && keyExtractor(item)) || index}
            style={{ height: itemHeight }}
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
  } = props;

  const [offset, setOffset] = useState(props.items.length);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(props.items);
  const [itemDimensions, setItemDimensions] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState(null);
  const [endReached, setEndReached] = useState(false);

  const getLimit = () => {
    const itemsInHeight = Math.round(
      window.innerHeight / (itemDimensions.height + 14)
    );
    const itemsInWidth = Math.round(
      containerDimensions.width / itemDimensions.width
    );
    return itemsInHeight * itemsInWidth;
  };

  const getNextPage = async () => {
    if (itemDimensions && containerDimensions && !loading && !endReached) {
      setLoading(true);
      const results = await getItems(offset, getLimit());
      setEndReached(
        totalCount
          ? totalCount === items.length + results.length
          : !results.length
      );
      setOffset(offset + results.length);
      setLoading(false);
      setItems(items.concat(results));
    }
  };

  useEffect(() => {
    getNextPage();
  }, [itemDimensions, containerDimensions]);

  const observerOptions = {
    onChange: ({ isIntersecting }) => {
      if (isIntersecting) {
        getNextPage();
      }
    },
  };

  const setContainerRef = ref => {
    if (ref && !containerDimensions) {
      setContainerDimensions(ref.getBoundingClientRect());
    }
  };
  const setEventRef = ref => {
    if (ref && !itemDimensions) {
      setItemDimensions(ref.getBoundingClientRect());
    }
  };

  return (
    <Fragment>
      <Observer {...observerOptions}>
        <div className={`grid ${className}`} ref={setContainerRef}>
          {items.map((item, index) => (
            <div
              ref={index === 0 ? setEventRef : null}
              key={(keyExtractor && keyExtractor(item)) || index}
              style={{ height: itemHeight }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </Observer>
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
