import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import SelectAsync from 'react-select/async';
import find from 'lodash/find';

import selectStyles from '../styles/selectStyles';

AutoCompleteInput.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function AutoCompleteInput(props) {
  const loadedOptions = useRef([]);

  const loadOptions = async (...opts) => {
    const options = await props.loadOptions(...opts);
    loadedOptions.current = options;
    return options;
  };

  const onChange = ({ value }) => props.onChange(value);

  const clear = () => props.onChange(null);

  const currentValue =
    find(loadedOptions.current, { value: props.value }) || null;

  return (
    <div className="container">
      <div className="input">
        <SelectAsync
          {...props}
          classNamePrefix={selectStyles.className + ' select'}
          value={currentValue}
          onChange={onChange}
          loadOptions={loadOptions}
        />
      </div>
      <button className="clear" onClick={clear} />
      {selectStyles.styles}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .input {
          flex-grow: 1;
        }
        .clear {
          width: 1em;
          height: 1em;
          margin: 0.5em;
          background: url(/static/img/input-clear.svg) no-repeat center center;
          background-size: cover;
        }
      `}</style>
    </div>
  );
}

export default memo(AutoCompleteInput);
