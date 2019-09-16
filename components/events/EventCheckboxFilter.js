import PropTypes from 'prop-types';
import without from 'lodash/without';

import CheckBox from '../Checkbox';

EventCheckboxFilter.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  checked: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

function EventCheckboxFilter(props) {
  const { checked = [], items = [], onChange } = props;

  const onCheckboxChange = value => () => {
    let newChecked;
    if (checked.includes(value)) {
      newChecked = without(checked, value);
    } else {
      newChecked = checked.concat(value);
    }
    if (!newChecked.length) {
      newChecked = null;
    }
    onChange(newChecked);
  };

  return (
    <div className="container">
      {items.map(({ value, label }) => (
        <CheckBox
          key={value}
          checked={checked.includes(value)}
          value={value}
          onChange={onCheckboxChange(value)}
          label={label}
        />
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container :global(.form-checkbox) {
          margin: 0.3em 0;
        }
      `}</style>
    </div>
  );
}

export default EventCheckboxFilter;
