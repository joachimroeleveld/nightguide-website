import React, { memo, useState } from 'react';

import Select from '../Select';
import { formatEventDate } from '../../lib/dates';
import { isEventDatePast } from '../../lib/events';

function EventDateSelect(props) {
  const { dates } = props;

  const options = dates.map((date, index) => ({
    value: index.toString(),
    label: formatEventDate(date.from, date.to),
    isPast: isEventDatePast(date),
  }));

  const [value, setValue] = useState(
    options[props.value - (dates.length - options.length)]
  );

  const onSelect = value => {
    setValue(value);
    props.onSelect(parseInt(value.value) + (dates.length - options.length));
  };

  return (
    <Select
      value={value}
      onSelect={onSelect}
      options={options}
      isSearchable={false}
      styles={{
        option: (styles, { data }) => ({
          ...styles,
          textDecoration: data.isPast ? 'line-through' : undefined,
        }),
        singleValue: styles => ({
          ...styles,
          textDecoration: value.isPast ? 'line-through' : undefined,
        }),
      }}
    />
  );
}

export default memo(EventDateSelect);
