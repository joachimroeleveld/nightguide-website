import { useEffect, useState, useRef } from 'react';
import EventGrid from './EventGrid';
import debounce from 'lodash/debounce';
import range from 'lodash/range';
import Swipe from 'react-easy-swipe';

import __ from '../../lib/i18n';
import { getEvents } from '../../lib/api';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';

function EventRow(props) {
  const { baseUrl, initialEvents, filter, sortBy } = props;

  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({});
  const [itemsInWidth, setItemsInWidth] = useState(4);
  const [loadedPages, setLoadedPages] = useState(1);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState(initialEvents || []);
  const [fetching, setFetching] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const itemRefs = useRef({});

  useEffect(() => {
    if (!items.length && !fetching && !reachedEnd) {
      loadNextPage();
    }
  }, [items]);

  useEffect(() => calculateDimensions(), [containerRef.current, items, page]);

  useEffect(() => {
    const resizeListener = debounce(() => {
      calculateDimensions();
    }, 100);
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [items]);

  const calculateDimensions = () => {
    if (!containerRef.current || !items.length) return;

    const width = containerRef.current.getBoundingClientRect().width;
    // Get highest item on current page
    const height = Object.keys(itemRefs.current[page]).reduce(
      (maxHeight, item) => {
        const itemHeight = itemRefs.current[page][item].getBoundingClientRect()
          .height;
        return itemHeight > maxHeight ? itemHeight : maxHeight;
      },
      0
    );

    setContainerDimensions({
      width,
      height,
    });

    const itemsInWidth = Math.round(
      width / itemRefs.current['1']['0'].getBoundingClientRect().width
    );
    // Assuming equal width
    setItemsInWidth(itemsInWidth);

    let loadedPages;
    if (reachedEnd) {
      loadedPages = Math.ceil(items.length / itemsInWidth);
    } else {
      loadedPages = Math.floor(items.length / itemsInWidth);
    }
    setLoadedPages(loadedPages);

    let adjustedPage = Math.floor(offset / itemsInWidth) + 1;
    adjustedPage = Math.min(loadedPages, adjustedPage);
    setPage(Math.max(1, adjustedPage));

    if (loadedPages === adjustedPage) {
      loadNextPage(itemsInWidth);
    }
  };

  const scrollToPage = newPage => {
    if (newPage === 0 || newPage > loadedPages) return;

    setPage(newPage);
    setOffset((newPage - 1) * itemsInWidth);
  };

  const loadNextPage = async (limit = itemsInWidth) => {
    if (fetching || reachedEnd) {
      return;
    }

    setFetching(true);

    const pageResults = await getEvents({
      offset: items.length,
      limit,
      query: filter,
      sortBy,
    });

    const newItems = items.concat(pageResults.results);

    if (pageResults.totalCount === newItems.length) {
      setReachedEnd(true);
    }

    setFetching(false);
    setItems(newItems);
  };

  const setItemRef = (page, index, ref) => {
    if (ref) {
      if (!itemRefs.current[page]) {
        itemRefs.current[page] = {};
      }
      itemRefs.current[page][index] = ref;
    }
  };

  // console.log('loadedPages', loadedPages);
  // console.log('itemsInWidth', itemsInWidth);
  // console.log('offset', offset);
  // console.log('items.length', items.length);
  // console.log('page', page);
  // console.log('reachedEnd', reachedEnd);
  // console.log('===========');

  return (
    <div className="root">
      <div className="prev-page">
        <button
          className={page === 1 ? 'hide' : ''}
          onClick={() => scrollToPage(page - 1)}
        />
      </div>
      <div
        ref={containerRef}
        className={['container', !items.length ? 'empty' : null].join(' ')}
      >
        <Swipe
          onSwipeLeft={() => scrollToPage(page + 1)}
          onSwipeRight={() => scrollToPage(page - 1)}
        >
          <div
            className="items"
            style={{
              gridTemplateColumns: '1fr '.repeat(loadedPages),
              height: containerDimensions.height,
              width: loadedPages * containerDimensions.width,
              transform: `translateX(-${(page - 1) *
                (containerDimensions.width + 14)}px)`,
            }}
          >
            {range(1, loadedPages + 1).map(page => {
              const events = items.slice(
                (page - 1) * itemsInWidth,
                page * itemsInWidth
              );
              return (
                <div
                  key={page}
                  className="page"
                  style={{ width: containerDimensions.width }}
                >
                  <EventGrid
                    baseUrl={baseUrl}
                    events={events}
                    setGridItemRef={(index, ref) =>
                      setItemRef(page, index, ref)
                    }
                  />
                </div>
              );
            })}
          </div>
        </Swipe>
        {!items.length && (
          <span className="empty-message">{__('noEventsForDates')}</span>
        )}
      </div>
      <div className="next-page">
        <button
          className={reachedEnd && loadedPages === page ? 'hide' : ''}
          onClick={() => scrollToPage(page + 1)}
        />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .root {
          display: flex;
          margin: 0 -2em;
        }
        .container {
          flex-grow: 1;
          overflow: hidden;
          min-height: 200px;
        }
        .container.empty {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .items {
          display: grid;
          grid-gap: ${dimensions.gridGap};
          transition: ease-out 0.3s;
        }
        .prev-page,
        .next-page {
          flex-shrink: 0;
          width: 2em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prev-page button,
        .next-page button {
          width: 1em;
          margin: 0 0.5em;
          height: 60px;
          border: 1px solid #595959;
          border-radius: 3px;
          background: url(/static/img/pager-arrow.svg) no-repeat center center;
          transition: opacity 0.2s;
        }
        .prev-page button.hide,
        .next-page button.hide {
          opacity: 0;
        }
        .prev-page button {
          transform: rotate(180deg);
        }
        .empty-message {
          color: ${colors.textSecondary};
        }
      `}</style>
    </div>
  );
}

export default EventRow;
