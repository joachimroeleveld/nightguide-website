import React from 'react';

import { _o } from '../lib/i18n';
import colors from '../styles/colors';

function TagList(props) {
  const { tags } = props;

  if (!tags.length) {
    return null;
  }

  return (
    <React.Fragment>
      <ul className={'container'}>
        {tags.map(tag => (
          <li key={tag.id} className="tag">
            {_o(tag.name)}
          </li>
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
          list-style: none;
          display: inline-block;
          padding: 0.05em 1em;
          text-decoration: none;
          border: 2px solid ${colors.tagButtonBorderColor};
          border-radius: 16px;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
      `}</style>
    </React.Fragment>
  );
}

export default TagList;
