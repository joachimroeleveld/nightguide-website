import React, { Fragment, memo, useState } from 'react';
import Select from 'react-select';
import css from 'styled-jsx/css';

import colors from '../../styles/colors';
import { formatEventDate } from '../../lib/dates';
import { getFutureEventDates } from '../../lib/events';

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

function EventDateSelect(props) {
  const { dates } = props;

  const options = getFutureEventDates(dates).map((date, index) => ({
    value: index.toString(),
    label: formatEventDate(date.from, date.to),
  }));

  const [value, setValue] = useState(
    options[props.value - (dates.length - options.length)]
  );

  const onChange = value => {
    setValue(value);
    props.onChange(value.value);
  };

  return (
    <Fragment>
      <Select
        classNamePrefix={styles.className + ' select'}
        value={value}
        onChange={onChange}
        options={options}
        isSearchable={false}
      />
      {styles.styles}
    </Fragment>
  );
}

export default memo(EventDateSelect);
