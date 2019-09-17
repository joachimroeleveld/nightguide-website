import React, { memo, useRef, useState } from 'react';
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
  const [isDirty, setIsDirty] = useState(false);

  const loadOptions = async (...opts) => {
    const options = await props.loadOptions(...opts);
    loadedOptions.current = options;
    return options;
  };

  const onChange = val => {
    setIsDirty(true);
    props.onChange(val ? val.value : null);
  };

  const currentValue =
    !isDirty && props.defaultInputValue
      ? { value: props.value }
      : find(loadedOptions.current, { value: props.value }) || null;

  return (
    <div className="container">
      <SelectAsync
        {...props}
        classNamePrefix={selectStyles.className + ' select'}
        value={currentValue}
        onChange={onChange}
        loadOptions={loadOptions}
        isClearable={true}
      />
      {selectStyles.styles}
    </div>
  );
}

export default memo(AutoCompleteInput);
