import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export const WEEKENDS = [6, 7]; // Saturday, Sunday

export const isEnableDateToScheduleWisdom = dateString => {
  if (!dateString) {
    return true;
  }

  if (moment(dateString) > moment().add(1, 'day') && !WEEKENDS.includes(moment(dateString).isoWeekday())) {
    return true;
  }
  return false;
};

// ((workdaysCount div 5) * 7) - full weeks
// workdaysCount mod 5) - additional days
const convertWeekdaysToWorkdays = daysCount => [Math.trunc(daysCount / 7) * 5, daysCount % 7];

const calculateWeekdays = range => {
  const { length } = Array.from(range.by('days'));
  const startWeekday = range.start.isoWeekday();
  const firstWeekMonday = startWeekday - 1;
  const [fullWeeks, exceedDays] = convertWeekdaysToWorkdays(length + firstWeekMonday);
  const lastWeekWorkDays = Math.trunc(exceedDays / 5) * 5 || exceedDays % 5;

  return fullWeeks - firstWeekMonday + lastWeekWorkDays;
};

export const doesWisdomContentFillRange = (selectedPackage, startDate, endDate) => {
  if (startDate && endDate) {
    const start = moment(startDate) > moment().add(1, 'days') ? moment(startDate) : moment().add(2, 'days');
    const range = moment.range(start, moment(endDate));
    const workdaysCount = calculateWeekdays(range);

    if (selectedPackage && selectedPackage.id) {
      return Math.sign(selectedPackage.wisdoms.length - workdaysCount);
    } else if (selectedPackage && _.isNumber(selectedPackage.wisdomCount)) {
      return Math.sign(selectedPackage.wisdomCount - workdaysCount);
    }
    return -1;
  }
  return 0;
};
