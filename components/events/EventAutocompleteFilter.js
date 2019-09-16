import PropTypes from 'prop-types';

import AutoCompleteInput from '../AutoCompleteInput';

EventAutoCompleteFilter.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function EventAutoCompleteFilter(props) {
  const { loadOptions, value, onChange, ...otherProps } = props;

  return (
    <div className="container">
      <AutoCompleteInput
        {...otherProps}
        loadOptions={loadOptions}
        value={value}
        onChange={onChange}
        cacheOptions={true}
      />
    </div>
  );
}

export default EventAutoCompleteFilter;
