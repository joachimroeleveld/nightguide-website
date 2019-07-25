import { Fragment, useEffect, useState, useRef } from 'react';
import EventGrid from './EventGrid';
import debounce from 'lodash/debounce';
import range from 'lodash/range';
import sum from 'lodash/sum';
import Swipe from 'react-easy-swipe';
import get from 'lodash/get';

import __ from '../../lib/i18n';
import { getEvents } from '../../lib/api';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';
import Spinner from '../Spinner';

function EventRow(props) {
  const { routeParams, initialEvents, filter, sortBy, rowCount = 1 } = props;

  const itemRefs = useRef({});
  const [containerRef, setContainerRef] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [loadedPages, setLoadedPages] = useState(1);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState(initialEvents || []);
  const [fetching, setFetching] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(props.reachedEnd || false);

  useEffect(() => {
    if ((!items.length || loadedPages < page + 1) && !fetching && !reachedEnd) {
      loadNextPage();
    }
  }, [items, fetching]);

  useEffect(() => {
    const resizeListener = debounce(() => {
      calculateDimensions();
    }, 100);
    resizeListener();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [containerRef, items, page, rowCount]);

  const calculateDimensions = () => {
    if (!containerRef || !items.length || !get(itemRefs.current, '1.0')) {
      return;
    }

    const width = containerRef.getBoundingClientRect().width;

    const columnWidth = itemRefs.current['1']['0'].getBoundingClientRect()
      .width;
    const columnCount = Math.round(
      // Assuming equal column width
      width / (columnWidth || 1)
    );
    const itemsPerPage = columnCount * rowCount;
    setItemsPerPage(itemsPerPage);

    // Get items per column
    const columns = range(1, columnCount + 1).map(columnNo =>
      range(1, rowCount + 1)
        .map(rowNo => columnCount * rowNo - columnCount + columnNo - 1)
        .map(index => itemRefs.current[page][index])
    );
    const height =
      sum(columns[0].map(item => item && item.getBoundingClientRect().height)) +
      // Grid gap
      (rowCount - 1) * 14;

    setContainerDimensions({
      width,
      height,
    });

    let loadedPages;
    if (reachedEnd) {
      loadedPages = Math.ceil(items.length / itemsPerPage);
    } else {
      loadedPages = Math.floor(items.length / itemsPerPage);
    }
    setLoadedPages(loadedPages);

    let adjustedPage = Math.floor(offset / itemsPerPage) + 1;
    adjustedPage = Math.min(loadedPages, adjustedPage);
    setPage(Math.max(1, adjustedPage));

    if (loadedPages === adjustedPage) {
      loadNextPage(itemsPerPage);
    }
  };

  const scrollToPage = newPage => {
    if (newPage === 0 || newPage > loadedPages) return;

    setPage(newPage);
    setOffset((newPage - 1) * itemsPerPage);
  };

  const loadNextPage = async (limit = itemsPerPage) => {
    if (fetching || reachedEnd) {
      return;
    }

    try {
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

      setItems(newItems);
    } finally {
      setFetching(false);
    }
  };

  const setItemRef = (page, index, ref) => {
    if (ref) {
      itemRefs.current = {
        ...itemRefs.current,
        [page]: {
          ...(itemRefs.current[page] || {}),
          [index]: ref,
        },
      };
    }
  };

  // console.log('loadedPages', loadedPages);
  // console.log('itemsPerPage', itemsPerPage);
  // console.log('offset', offset);
  // console.log('items.length', items.length);
  // console.log('page', page);
  // console.log('reachedEnd', reachedEnd);
  // console.log('===========');

  return (
    <Fragment>
      <div className={'root'}>
        <div
          ref={setContainerRef}
          className={['container', !items.length ? 'empty' : null].join(' ')}
        >
          <Swipe
            allowMouseEvents={true}
            tolerance={30}
            onSwipeLeft={() => scrollToPage(page + 1)}
            onSwipeRight={() => scrollToPage(page - 1)}
          >
            <div
              className="items"
              style={{
                gridTemplateColumns: '1fr '.repeat(loadedPages),
                width: containerDimensions.width
                  ? loadedPages * containerDimensions.width
                  : 'auto',
                height: containerDimensions.height,
                transform: `translateX(-${(page - 1) *
                  (containerDimensions.width + 14)}px)`,
              }}
            >
              {range(1, loadedPages + 1).map(page => {
                const events = items.slice(
                  (page - 1) * itemsPerPage,
                  page * itemsPerPage
                );
                return (
                  <div
                    key={page}
                    className="page"
                    style={{ width: containerDimensions.width }}
                  >
                    <EventGrid
                      double={rowCount === 2}
                      routeParams={routeParams}
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
            <Fragment>
              {fetching && <Spinner size={14} />}
              {!fetching && (
                <span className="empty-message">{__('noEventsForDates')}</span>
              )}
            </Fragment>
          )}
        </div>
        {!!items.length && (
          <div className="pager">
            <button
              className={['prev', page === 1 ? 'disabled' : ''].join(' ')}
              onClick={() => scrollToPage(page - 1)}
            />
            <button
              className={[
                'next',
                fetching && loadedPages === page ? 'fetching' : '',
                reachedEnd && loadedPages === page ? 'disabled' : '',
              ].join(' ')}
              onClick={() => scrollToPage(page + 1)}
            >
              {fetching && loadedPages === page && <Spinner size={10} />}
            </button>
          </div>
        )}
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .root {
          position: relative;
          height: 100%;
          box-sizing: border-box;
        }
        .container {
          height: 100%;
          flex-grow: 1;
          overflow: hidden;
          min-height: 188px;
        }
        .container.empty {
          min-height: auto;
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
        .pager {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5em;
        }
        .pager button {
          width: 2em;
          height: 2em;
          border: 1px solid #595959;
          border-radius: 3px;
          background: url(/static/img/pager-arrow.svg) no-repeat center center;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pager button.fetching {
          background: none;
        }
        .pager button.disabled {
          opacity: 0.5;
        }
        .pager .prev {
          transform: rotate(180deg);
        }
        .pager .next {
          margin-left: 0.3em;
        }
        .empty-message {
          color: ${colors.textSecondary};
        }
      `}</style>
    </Fragment>
  );
}

export default EventRow;
