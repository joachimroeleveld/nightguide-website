import React, { Fragment, memo } from 'react';
import css from 'styled-jsx/css';
import PropTypes from 'prop-types';
import RctSelect from 'react-select';

import colors from '../styles/colors';

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
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    background: #3D3D3D;
  }
  .select__control, .select__control:hover {
    border: none !important;
    background: #3D3D3D !important;
  }
  .select__single-value {
    color: #fff;
  }
  .select__indicator {
    color: #7E7E7E;
    background: #3D3D3D;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
  .select__indicator:hover {
    color: #7E7E7E;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__menu {
    background: #3D3D3D;
  }
  .select__option {
    background: #3D3D3D;
    color: #fff;
  }
  .select__option:hover {
    background: ${colors.bg};
    color: #fff;
  }
`;

export default memo(Select);
