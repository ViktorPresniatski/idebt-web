import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { extendMoment } from 'moment-range';

import Cell from './Cell';
import Row from './Row';
import './styles.scss';

const moment = extendMoment(Moment);

class CalendarByWeeks extends React.PureComponent {
  getCells = row => {
    const { isoMode } = this.props;
    const endOfWeek = isoMode ? 'isoWeek' : 'week';
    return [...moment.range(row, row.clone().endOf(endOfWeek)).by('day')];
  };

  renderCalendarCell = (cell, index) => {
    const { cellClassName, renderCell } = this.props;

    return <Cell key={index} date={cell} cellClassName={cellClassName} renderCell={renderCell} />;
  };

  renderRow = (row, rowIndex) => {
    const { filterDates, rowClassName, renderRow } = this.props;
    const cells = this.getCells(row).filter(cell => (filterDates instanceof Function ? filterDates(cell) : true));

    return (
      <Row key={rowIndex} rowTitle={row.week()} rowClassName={rowClassName} renderRow={renderRow} cells={cells}>
        {cells.map((cell, cellIndex) => this.renderCalendarCell(cell, cellIndex))}
      </Row>
    );
  };

  render() {
    const { calendarClassName, period } = this.props;
    const rows = [...moment.range(period[0], period[1]).by('week')];

    return (
      <div className={classNames('calendar-by-weeks', calendarClassName)}>
        {rows.map((row, index) => this.renderRow(row, index))}
      </div>
    );
  }
}

CalendarByWeeks.defaultProps = { isoMode: false };

CalendarByWeeks.propTypes = {
  calendarClassName: PropTypes.string,
  cellClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  renderCell: PropTypes.func,
  filterDates: PropTypes.func,
  renderRow: PropTypes.func,
  isoMode: PropTypes.bool,
  period: PropTypes.array,
};

export default CalendarByWeeks;
