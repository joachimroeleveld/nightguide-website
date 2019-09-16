import React, { memo, useState } from 'react';

import Select from '../Select';
import { formatEventDate } from '../../lib/dates';
import { getFutureEventDates } from '../../lib/events';

function EventDateSelect(props) {
  const { dates } = props;

  const options = getFutureEventDates(dates).map((date, index) => ({
    value: index.toString(),
    label: formatEventDate(date.from, date.to),
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
    />
  );
}

export default memo(EventDateSelect);
