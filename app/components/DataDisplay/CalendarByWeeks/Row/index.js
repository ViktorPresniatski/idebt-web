import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

class Row extends React.PureComponent {
  render() {
    const { rowClassName, renderRow, rowTitle, cells, children } = this.props;

    return (
      <div className={classNames('calendar-by-weeks-row', rowClassName)}>
        {renderRow instanceof Function ? (
          renderRow(rowTitle, cells)
        ) : (
          <div className="calendar-by-weeks-row-week-name">
            <span className="calendar-by-weeks-row-week-name-text">{rowTitle}</span>
          </div>
        )}
        <div className="calendar-by-weeks-row-weekdays">{children}</div>
      </div>
    );
  }
}

Row.propTypes = {
  rowClassName: PropTypes.string,
  rowTitle: PropTypes.number,
  children: PropTypes.array,
  renderRow: PropTypes.func,
  cells: PropTypes.array,
};

export default Row;
