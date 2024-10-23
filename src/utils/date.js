import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const durationText = (date, format) => {
  const now = dayjs();
  const to = typeof date === 'string' ? dayjs(date, format) : dayjs(date);
  const durations = dayjs.duration(now.diff(to));

  const minutes = durations.asMinutes();
  const hours = durations.asHours();
  const days = durations.asDays();
  const months = durations.asMonths();

  if (minutes < 1) {
    return '방금전';
  } else if (minutes >= 1 && hours < 1) {
    return `${Math.floor(minutes)}분전`;
  } else if (hours >= 1 && days < 1) {
    return `${Math.floor(hours)}시간전`;
  } else if (days >= 1 && months < 1) {
    return `${Math.floor(days)}일전`;
  } else if (months >= 1 && months < 6) {
    return `${Math.floor(months)}개월전`;
  } else {
    return to.format('YYYY.MM.DD');
  }
};
