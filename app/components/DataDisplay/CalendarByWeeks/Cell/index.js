import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

class Cell extends React.PureComponent {
  render() {
    const { cellClassName, renderCell, date } = this.props;

    return (
      <div className={classNames('calendar-by-weeks-cell', cellClassName)}>
        {renderCell instanceof Function ? (
          renderCell(date)
        ) : (
          <div>
            <div className="calendar-by-weeks-row-week-name">{date.toString()}</div>
          </div>
        )}
      </div>
    );
  }
}

Cell.propTypes = {
  cellClassName: PropTypes.string,
  renderCell: PropTypes.func,
  date: PropTypes.object,
};

export default Cell;
