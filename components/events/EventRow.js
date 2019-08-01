import { Fragment, useEffect, useState, useRef, memo } from 'react';
import EventGrid from './EventGrid';
import range from 'lodash/range';
import sum from 'lodash/sum';
import Swipe from 'react-easy-swipe';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Link } from '../../routes';
import __ from '../../lib/i18n';
import { getEvents } from '../../lib/api';
import dimensions from '../../styles/dimensions';
import colors from '../../styles/colors';
import Spinner from '../Spinner';
import { classNames } from '../../lib/util';
import SeeAllButton from '../SeeAllButton';
import { serializeFilter } from './util';
import { useOnResize } from '../../lib/hooks';

const ASSUMED_ROW_HEIGHT = 188;

EventRow.propTypes = {
  routeParams: PropTypes.object,
  initialEvents: PropTypes.array,
  filter: PropTypes.object,
  seeAllParams: PropTypes.object,
  sortBy: PropTypes.string,
  rowCount: PropTypes.number,
};

EventRow.defaultProps = {
  filter: {},
  initialEvents: [],
  rowCount: 1,
};

function EventRow(props) {
  const {
    routeParams,
    events: initialEvents,
    filter,
    seeAllParams,
    sortBy,
    rowCount,
  } = props;

  const getOffsetForPage = page =>
    -(page - 1) * (containerDimensions.width + 14);

  const itemRefs = useRef({});
  const [containerRef, setContainerRef] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [loadedPages, setLoadedPages] = useState(null);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState(initialEvents || []);
  const [totalCount, setTotalCount] = useState(props.totalCount || null);
  const [fetching, setFetching] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(
    initialEvents && props.totalCount === initialEvents.length
  );
  const [translateX, setTranslateX] = useState(getOffsetForPage(page));
  const [swiping, setSwiping] = useState(false);
  const offsetX = useRef(0);

  // Reset if filter changes
  useEffect(() => {
    setItems(initialEvents || []);
    setLoadedPages(null);
    setPage(1);
    setOffset(0);
    setTotalCount(props.totalCount || null);
    setFetching(false);
    setReachedEnd(initialEvents && props.totalCount === initialEvents.length);
  }, [filter]);

  // Load items if empty
  useEffect(() => {
    if (!items.length) {
      loadNextPage();
    }
  }, [items]);

  // Lazy-load next page
  useEffect(() => {
    if (loadedPages !== null && loadedPages < page + 1) {
      loadNextPage();
    }
  }, [page, loadedPages]);

  // Adjust translation to page
  useEffect(() => {
    setTranslateX(getOffsetForPage(page));
  }, [page]);

  useOnResize(() => calculateDimensions(), [
    containerRef,
    items,
    page,
    rowCount,
  ]);

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
    if (!columns.length) {
      return;
    }

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

    setOffset((newPage - 1) * itemsPerPage);
    setPage(newPage);
  };

  const loadNextPage = async (limit = itemsPerPage) => {
    if (fetching || reachedEnd) {
      return;
    }

    try {
      setFetching(true);
      const { results, totalCount } = await getEvents({
        offset: items.length,
        limit,
        query: filter,
        sortBy,
      });

      const newItems = items.concat(results);

      if (totalCount === newItems.length) {
        setReachedEnd(true);
      }

      setTotalCount(totalCount);
      setItems(newItems);
    } finally {
      setFetching(false);
    }
  };

  const onSwipeStart = () => {
    setSwiping(true);
  };

  const onSwipeEnd = () => {
    setSwiping(false);

    let newPage;
    if (offsetX.current < 0) {
      newPage = page + 1;
    } else {
      newPage = page - 1;
    }

    if (newPage === 0 || newPage > loadedPages) {
      return setTranslateX(getOffsetForPage(page));
    }

    scrollToPage(newPage);
  };

  const onSwipeMove = pos => {
    const { x, y } = pos;
    offsetX.current = x;
    setTranslateX(getOffsetForPage(page) + x);
    if (Math.abs(y) < 30) return true;
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
          className={classNames([
            'container',
            !items.length && 'empty',
            fetching && 'fetching',
          ])}
        >
          <Swipe
            tolerance={30}
            // allowMouseEvents={true}
            onSwipeStart={onSwipeStart}
            onSwipeMove={onSwipeMove}
            onSwipeEnd={onSwipeEnd}
          >
            <div className="wrap">
              <div
                className={'items'}
                style={{
                  pointerEvents: swiping ? 'none' : 'auto',
                  gridTemplateColumns: '1fr '.repeat(loadedPages || 1),
                  width: containerDimensions.width
                    ? (loadedPages || 1) * containerDimensions.width
                    : 'auto',
                  height:
                    containerDimensions.height ||
                    (items.length
                      ? ASSUMED_ROW_HEIGHT * rowCount + 'px'
                      : 'auto'),
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {range(1, (loadedPages || 1) + 1).map(page => {
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
        {!!items.length && (
          <div className="see-all">
            <Link
              route="events"
              params={{
                ...routeParams,
                ...serializeFilter(seeAllParams ? seeAllParams : filter),
              }}
            >
              <SeeAllButton count={totalCount} />
            </Link>
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
          flex-grow: 1;
          min-height: ${ASSUMED_ROW_HEIGHT}px;
        }
        .container.empty {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .container.empty:not(.fetching) {
          min-height: auto;
        }
        .items {
          display: grid;
          grid-gap: ${dimensions.gridGap};
          transition: ease-out 0.3s;
        }
        .wrap {
          overflow: hidden;
        }
        .pager {
          position: absolute;
          right: 0;
          display: flex;
          justify-content: flex-end;
          margin-top: 1.5em;
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
        .see-all {
          display: inline-block;
          position: relative;
          z-index: 3;
          margin-top: 1.5em;
          height: 32px;
          align-items: center;
        }
        @media (max-width: 800px) {
          .wrap {
            margin: 0 -2em;
            padding: 0 2em;
          }
        }
        @media (min-width: 800px) {
          .wrap {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </Fragment>
  );
}

export default memo(EventRow);
