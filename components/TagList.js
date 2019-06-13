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
          <Link href={`${baseUrl}/tags/${tag.slug}`} key={tag.slug}>
            <li className="tag">
              <TagButton title={_o(tag.name)} />
            </li>
          </Link>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          margin: 1em -0.2em;
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
