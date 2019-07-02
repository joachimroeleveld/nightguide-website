import React from 'react';
import SecondaryButton from './SecondaryButton';
import __ from '../lib/i18n';

const FILTER_ITEMS = [
  {
    key: 'today',
    label: __('today'),
  },
  {
    key: 'tomorrow',
    label: __('tomorrow'),
  },
  {
    key: 'thisWeek',
    label: __('thisWeek'),
  },
  {
    key: 'pickDate',
    label: __('pickDate'),
  },
];

function EventDateFilterBar(props) {
  const { current, onChange } = props;

  const onClick = item => {};

  return (
    <div>
      {FILTER_ITEMS.map(item => (
        <SecondaryButton key={item.key} onClick={onClick} />
      ))}
    </div>
  );
}

export default EventDateFilterBar;
