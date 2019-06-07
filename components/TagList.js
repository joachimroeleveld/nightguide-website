import React from 'react';
import Link from 'next/link';

import TagButton from './TagButton';
import { _o } from '../lib/i18n';

function TagList(props) {
  const { tags, baseUrl } = props;

  if (!tags.length) {
    return null;
  }

  return (
    <React.Fragment>
      <ul className={'container'}>
        {tags.map(tag => (
          <Link href={`${baseUrl}/tags/${tag.slug}`} key={tag.id}>
            <li className="tag">
              <TagButton title={_o(tag.name)} />
            </li>
          </Link>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          margin: 1.5em 0;
          display: flex;
        }
        .tag {
          margin: 0 0.4em;
        }
        .tag:first-child {
          margin-left: 0;
        }
        .tag:last-child {
          margin-right: 0;
        }
        ul {
          margin: 0;
          padding: 0;
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
