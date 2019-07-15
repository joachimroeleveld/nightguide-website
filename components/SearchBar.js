import { Fragment, useState } from 'react';
import __ from '../lib/i18n';
import colors from '../styles/colors';

function SearchBar(props) {
  const [val, setVal] = useState('');

  const onValChange = event => {
    setVal(event.target.value);
  };

  return (
    <Fragment>
      <div className="bar">
        <input
          type="text"
          className="input"
          value={val}
          onChange={onValChange}
          placeholder={__('searchBarPlaceholder')}
        />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
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
        .input:focus {
          border-color: #8b8b8b;
        }
      `}</style>
    </Fragment>
  );
}

export default SearchBar;
