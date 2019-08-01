import { Fragment, useState, useMemo, useEffect, useCallback } from 'react';
import css from 'styled-jsx/css';
import Modal from 'react-modal';
import Router from 'next/router';
import debounce from 'lodash/debounce';
import find from 'lodash/find';
import update from 'immutability-helper';

import { Link } from '../routes';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import { getEvents, getVenues, getArtists } from '../lib/api';
import Spinner from './Spinner';
import { withNavigation } from './Navigation';
import { formatEventDate } from '../lib/dates';
import { classNames, capitalizeWords } from '../lib/util';

const MINIMUM_QUERY_LENGTH = 2;

/*language=CSS*/
const createModalStyles = offsetTop => css.resolve`
  .ReactModal__Overlay {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    margin-top: ${offsetTop}px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 300ms;
  }
  .ReactModal__Content {
    height: 100%;
    position: relative;
    width: 100%;
    margin: 0 auto;
    outline: none;
    WebkitOverflowScrolling: touch;
  }
  .ReactModal__Overlay--after-open{
      opacity: 1;
  }
  .ReactModal__Overlay--before-close{
      opacity: 0;
  }
  @media (min-width: 800px) {
    .ReactModal__Content {
      height: 70%;
    }
  }
`;

const SEARCH_SECTIONS = [
  {
    key: 'venues',
    label: __('venues'),
    cb: (query, opts) =>
      getVenues({ ...opts, query: { query, ...opts.query } }),
    renderItem: (item, routeParams, highlight) => (
      <Link route="venue" params={{ ...routeParams, venue: item.id }}>
        <a>{highlight(item.name)}</a>
      </Link>
    ),
  },
  {
    key: 'artists',
    label: __('search.artists'),
    cb: (query, opts) =>
      getArtists({ ...opts, query: { query, ...opts.query } }),
    renderItem: (item, routeParams, highlight) => (
      <Link route="events" params={{ ...routeParams, artist: item.id }}>
        <a>{highlight(capitalizeWords(item.name))}</a>
      </Link>
    ),
  },
  {
    key: 'events',
    label: __('events'),
    cb: (query, opts) =>
      getEvents({
        ...opts,
        query: { text: query, ...opts.query },
      }),
    renderItem: (
      { id, date, dateIndex, facebook, title },
      routeParams,
      highlight
    ) => (
      <Link route="event" params={{ ...routeParams, event: id, dateIndex }}>
        <a>
          <span className="date">{formatEventDate(date.from, date.to)}</span>
          <span>{highlight(facebook.title || title)}</span>
          {/*language=CSS*/}
          <style jsx>{`
            .date {
              margin-right: 1em;
              color: ${colors.textSecondary};
            }
          `}</style>
        </a>
      </Link>
    ),
  },
];

function SearchBar(props) {
  const {
    // searchContext,
    offsetTop,
    isOpen,
    setIsOpen,
    pageSlug,
    routeParams,
  } = props;

  const searchContext = null; // TODO: implement search context

  const [inputRef, setInputRef] = useState(null);
  const [val, setVal] = useState('');
  const [results, setResults] = useState({});
  const [fetching, setFetching] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen && inputRef) {
      inputRef.blur();
      setTimeout(() => {
        setVal('');
        setResults({});
      }, 300);
    }
  }, [inputRef, isOpen]);

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      Router.events.on('routeChangeStart', close);
      return () => Router.events.off('routeChangeStart', close);
    }
  }, [isOpen, close]);

  const fetchSection = async (sectionKey, query = val) => {
    const { key, cb } = find(SEARCH_SECTIONS, { key: sectionKey });

    query = query.trim();

    const existingResults =
      results[query] && results[query][key] && results[query][key].results;

    const result = await cb(query, {
      query: { pageSlug },
      limit: 4,
      offset: (existingResults && existingResults.length) || 0,
    });

    const allResults = result.results.concat(existingResults || []);
    const reachedEnd = allResults.length === result.totalCount;

    return { results: allResults, reachedEnd };
  };

  const fetchSections = useCallback(
    debounce(
      async query => {
        const promises = SEARCH_SECTIONS.map(({ key }) =>
          fetchSection(key, query)
        );

        try {
          const sectionResults = await Promise.all(promises);
          const resultsBySection = SEARCH_SECTIONS.reduce(
            (acc, section, index) => ({
              ...acc,
              [section.key]: sectionResults[index],
            }),
            {}
          );
          setResults(update(results, { [query]: { $set: resultsBySection } }));
        } finally {
          setFetching(false);
        }
      },
      1000,
      { leading: false }
    ),
    [results]
  );

  const loadMore = async sectionKey => {
    setFetching(true);
    try {
      const result = await fetchSection(sectionKey, val);
      setResults(
        update(results, {
          [val]: { [sectionKey]: { $set: result } },
        })
      );
    } finally {
      setFetching(false);
    }
  };

  const applyQuery = query => {
    if (!results[query]) {
      setFetching(true);
      fetchSections(query);
    } else {
      setFetching(true);
      setTimeout(() => {
        setFetching(false);
      }, 100);
    }
  };

  const onValChange = event => {
    const query = event.target.value;

    setVal(query);

    if (query.trim().length >= MINIMUM_QUERY_LENGTH) {
      applyQuery(query.trim());
    }
  };

  const onAfterModalOpen = () => {
    inputRef.focus();
  };

  const highlight = text => {
    let Html = [];
    let pattern = new RegExp(val.trim(), 'gi');
    let match;
    let lastIndex = 0;
    while ((match = pattern.exec(text)) !== null) {
      Html.push(<span>{text.slice(lastIndex, match.index)}</span>);
      Html.push(<strong>{match[0]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    Html.push(<span>{text.slice(lastIndex)}</span>);
    return Html;
  };

  const modalStyles = useMemo(() => createModalStyles(offsetTop), [offsetTop]);

  const searchResult = results[val.trim()];
  const noResults =
    !fetching &&
    val.length >= MINIMUM_QUERY_LENGTH &&
    searchResult &&
    !find(Object.values(searchResult), section => section.results.length);

  return (
    <Fragment>
      <div className="bar">
        <input
          ref={setInputRef}
          type="text"
          className={classNames([
            'input',
            searchContext && 'context',
            isOpen && 'open',
          ])}
          value={val}
          onChange={onValChange}
          onFocus={open}
          placeholder={
            searchContext && !isOpen
              ? searchContext.join(' ● ')
              : __('search.searchBarPlaceholder')
          }
        />
      </div>
      <Modal
        closeTimeoutMS={300}
        isOpen={isOpen}
        onRequestClose={close}
        onAfterOpen={onAfterModalOpen}
        overlayClassName={modalStyles.className}
        className={modalStyles.className}
        shouldFocusAfterRender={false}
      >
        <Fragment>
          <div className="modal-content">
            <div className="inner">
              {fetching && (
                <div className="spinner">
                  <Spinner size={20} />
                </div>
              )}
              {noResults && (
                <div className="message">
                  {__('search.noResults', { query: val })}
                </div>
              )}
              {!val && <div className="message">{__('search.searchFor')}</div>}
              {searchResult &&
                SEARCH_SECTIONS.map(section => {
                  const { key, label, route, renderItem } = section;

                  const sectionResult = searchResult[key];
                  if (!sectionResult) return null;

                  const { results, reachedEnd } = sectionResult;
                  if (!results.length) return null;

                  return (
                    <section className="search-section" key={route}>
                      <header>
                        <div className="label">{label}</div>
                      </header>
                      <ul>
                        {results.map((item, index) => (
                          <li key={index}>
                            {renderItem(item, routeParams, highlight)}
                          </li>
                        ))}
                      </ul>
                      {!reachedEnd && (
                        <button
                          className="load-more"
                          onClick={() => loadMore(key)}
                        >
                          {__('search.loadMoreResults')}
                        </button>
                      )}
                    </section>
                  );
                })}
            </div>
          </div>
          <div className="shadow" />
        </Fragment>
      </Modal>
      {modalStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .bar {
          display: flex;
          align-items: center;
        }
        .input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.6em 1.7em 0.6em 3em;
          background: url(/static/img/search-icon.svg) no-repeat left 0.7em
            center rgba(216, 216, 216, 0.11);
          border: 1px solid #525252;
          border-radius: 3px;
          transition: all 0.3s;
        }
        .input::placeholder {
          color: ${colors.placeholderColor};
        }
        .input.context:not(.open)::placeholder {
          color: ${colors.text};
          font-weight: 600;
          opacity: 1;
        }
        .input:focus {
          border-color: #8b8b8b;
        }
        .modal-content {
          position: relative;
          z-index: 1;
          background: ${colors.bg};
          height: calc(100% - 30px);
          width: 100%;
        }
        .modal-content > .inner {
          margin: 0 auto;
          max-width: ${dimensions.pageWidth};
          padding: 0 ${dimensions.bodyPadding};
          height: 100%;
          overflow-y: auto;
        }
        .modal-content + .shadow {
          height: 30px;
          width: 100%;
          position: absolute;
          bottom: 30px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
          z-index: 0;
        }
        .message {
          margin: 2em 0;
          color: ${colors.textSecondary};
        }
        .spinner {
          background: ${colors.bgOverlay};
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding-top: 3em;
          display: flex;
          justify-content: center;
        }
        .load-more {
          color: #fff;
          font-weight: 600;
          font-size: 0.9em;
          margin-top: 0.8em;
          text-decoration: underline;
        }
        .search-section {
          margin: 3em 0;
        }
        .search-section .label {
          color: ${colors.textSecondary};
          font-size: 0.8em;
        }
        .search-section :global(a) {
          padding: 0.8em 0;
          display: block;
        }
        .search-section li:not(:last-child) :global(a) {
          border-bottom: 1px solid ${colors.separator};
        }
        .search-section :global(a):focus {
          background-color: ${colors.focus};
        }
      `}</style>
    </Fragment>
  );
}

export default withNavigation(SearchBar);
