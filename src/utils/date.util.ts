import moment from 'moment';

export const formattedDate = (initialDate: string) => {
  const newDate = moment(initialDate).format('DD MMMM YYYY');

  return newDate;
};

export const countingDeadline = (initialDate: string) => {
  const now = moment();
  const deadline = moment(initialDate);
  const remainingDays = deadline.diff(now, 'days');

  if (deadline.isBefore(now)) {
    return 'Melewati Deadline';
  } else {
    const remainingDays = deadline.diff(now, 'days');
    return remainingDays;
  }
};
