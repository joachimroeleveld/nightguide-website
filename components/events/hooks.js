import { useEffect, useState } from 'react';

export function useDateFilter(query, props) {
  const { dateFrom, dateTo } = query;

  const [dateFilterId, setDateFilterId] = useState(
    query.dateFilter || (dateFrom && 'custom') || null
  );
  const [dateFilter, setDateFilter] = useState(
    dateFrom && dateTo ? [dateFrom, dateTo] : null
  );

  // Update date filter if query changes
  useEffect(() => {
    setDateFilter(
      (() => {
        if (dateTo) {
          return [dateFrom || new Date(), dateTo];
        }
        return null;
      })()
    );
  }, [dateFrom, dateTo]);

  // Update date filter id if query changes
  useEffect(() => {
    setDateFilterId(query.dateFilter || (dateFrom && 'custom') || null);
  }, [dateFrom, query.dateFilter]);

  const dateFilterChanged =
    props.dateFrom !== dateFrom || props.dateTo !== dateTo;

  return {
    dateFilter,
    setDateFilter,
    dateFilterChanged,
    dateFilterId,
  };
}
