import moment from 'moment/moment';

export const TIME_FORMAT = 'HH:mm';

export function parseSeconds(seconds) {
  return moment()
    .hour(0)
    .minute(0)
    .add(seconds, 'seconds');
}

export function checkIsOpenFromSchedule(schedule) {
  const todayScheduleParsed = getDayScheduleParsed(schedule);
  return (
    todayScheduleParsed &&
    moment().isBetween(todayScheduleParsed.from, todayScheduleParsed.to)
  );
}

export function getDayKey(dowOffset = 0) {
  return moment()
    .add(dowOffset, 'days')
    .locale('en')
    .format('ddd')
    .toLowerCase();
}

export function getDayScheduleParsed(schedule, isRange = true, dowOffset = 0) {
  const dayKey = getDayKey(dowOffset);
  const daySchedule = schedule[dayKey];

  if (!daySchedule || (isRange && (!daySchedule.from || !daySchedule.to))) {
    return null;
  }

  if (isRange) {
    const from = parseSeconds(daySchedule.from).add(dowOffset, 'days');
    let to = parseSeconds(daySchedule.to).add(dowOffset, 'days');
    return {
      from,
      to,
    };
  } else {
    return parseSeconds(daySchedule).add(dowOffset, 'days');
  }
}
