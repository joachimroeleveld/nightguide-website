import { useEffect, useRef, useState } from 'react';
import range from 'lodash/range';
import find from 'lodash/find';
import sum from 'lodash/sum';
import capitalize from 'lodash/capitalize';

import { classNames } from '../../lib/util';
import { useElemDimensions } from '../../lib/hooks';
import { Link } from '../../routes';

function ArtistList(props) {
  const { artists, horizontal = false, routeParams } = props;

  const [containerRef, setContainerRef] = useState(null);
  const [innerWidth, setInnerWidth] = useState(9999);
  const containerDimensions = useElemDimensions(containerRef);
  const itemRefs = useRef({});

  const setItemRef = (index, ref) => {
    itemRefs.current[index.toString()] = ref;
  };

  useEffect(() => {
    const widths = Object.values(itemRefs.current).map(
      ref => ref.getBoundingClientRect().width
    );
    const totalWidth = sum(widths);
    const split = find(range(0, widths.length), index => {
      return sum(widths.slice(0, index + 1)) >= totalWidth / 2;
    });
    setInnerWidth(sum(widths.slice(0, split + 1)));
  }, []);

  const horizontalMode = horizontal && innerWidth > containerDimensions.width;

  return (
    <div
      className={classNames(['container', horizontalMode && 'horizontal'])}
      ref={setContainerRef}
    >
      <ul style={{ width: horizontalMode ? innerWidth : 'auto' }}>
        {artists.map((artist, index) => (
          <li
            className="artist"
            key={artist.id}
            ref={ref => setItemRef(index, ref)}
          >
            {/*<Link route="artist" params={routeParams}>*/}
            <a>{capitalize(artist.name)}</a>
            {/*</Link>*/}
          </li>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        .container.horizontal {
          overflow-x: auto;
          overflow-y: hidden;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          margin: -0.25em;
        }
        .horizontal ul {
          overflow-x: auto;
          max-height: 4.525em;
        }
        .artist a {
          word-break: keep-all;
          display: block;
          background: #151515;
          border-radius: 3px;
          margin: 0.25em;
          padding: 0.1em 0.8em;
          transition: background-color 0.1s;
          text-transform: capitalize;
        }
        .artist a:hover {
          background-color: #434343;
        }
      `}</style>
    </div>
  );
}

export default ArtistList;
