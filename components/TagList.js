import React, { useMemo } from 'react';
import memoize from 'lodash/memoize';

import { Link } from '../routes';
import TagButton from './TagButton';
import { _o } from '../lib/i18n';

function TagList(props) {
  const { tags, routeParams } = props;

  if (!tags.length) {
    return null;
  }

  const getLinkParams = useMemo(
    () =>
      memoize(tagId => ({
        ...routeParams,
        tags: [tagId],
      })),
    [routeParams]
  );

  return (
    <React.Fragment>
      <ul className={'container'}>
        {tags.map(tag => (
          <Link key={tag.slug} route="events" params={getLinkParams(tag.id)}>
            <a>
              <li className="tag">
                <TagButton title={_o(tag.name)} />
              </li>
            </a>
          </Link>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          margin: 0 -0.2em;
          display: flex;
          flex-wrap: wrap;
        }
        .tag {
          margin: 0.2em;
        }
        li {
          padding: 0;
          list-style: none;
        }
      `}</style>
    </React.Fragment>
  );
}

export default TagList;
