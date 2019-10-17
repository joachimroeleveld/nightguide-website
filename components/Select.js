import React, { Fragment, memo } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import RctSelect from 'react-select';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

Select.propTypes = {
  options: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function Select(props) {
  const { options, value = null, onSelect, ...otherProps } = props;

  return (
    <Fragment>
      <RctSelect
        classNamePrefix={styles.className + ' select'}
        value={value}
        onChange={onSelect}
        options={options}
        {...otherProps}
      />
      {styles.styles}
    </Fragment>
  );
}

/*language=CSS*/
const styles = css.resolve`
  .select__value-container {
    border-bottom-left-radius: ${dimensions.inputRadius};
    border-top-left-radius: ${dimensions.inputRadius};
    background: ${colors.inputBg};
    padding: ${dimensions.inputPadding};
    line-height: ${dimensions.inputLineHeight};
  }
  .select__control, .select__control:hover {
    border: none !important;
    background: ${colors.inputBg} !important;
  }
  .select__single-value, .select__input {
    color: ${colors.text} !important;
  }
  .select__indicator {
    color: #7E7E7E;
    background: ${colors.inputBg};
    border-bottom-right-radius: ${dimensions.inputRadius};
    border-top-right-radius: ${dimensions.inputRadius};
    padding: 0 0.5em;
  }
  .select__indicator:hover {
    color: #7E7E7E;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__menu {
    background: ${colors.inputBg};
  }
  .select__option {
    background: ${colors.inputBg};
    color: ${colors.text};
  }
  .select__option:hover {
    background: ${colors.bg};
    color: ${colors.text};
  }
  .select__control {
    box-shadow: none;
    height: auto;
    min-height: auto;
  }
  .select__value-container > :global(div[class$="-Input"]) {
    margin: 0;
    padding: 0;
  }
`;

export default memo(Select);
