import moment from 'moment';

export const getLastMonday = date => {
  const momentDate = moment.utc(date);
  const month = momentDate.month() + 1;
  const year = momentDate.year();

  const d = new Date();
  if (year) {
    d.setFullYear(year);
  }
  d.setDate(1); // Roll to the first day of ...
  d.setMonth(month || d.getMonth() + 1); // ... the next month.
  do {
    // Roll the days backwards until Monday.
    d.setDate(d.getDate() - 1);
  } while (d.getDay() !== 1);
  return moment.utc(d);
};

export const checkIsMonthDisabled = date => {
  const lastMonday = getLastMonday(date).startOf('day');
  return (
    lastMonday <=
    moment()
      .utc()
      .add(1, 'days')
      .startOf('day')
  );
};
