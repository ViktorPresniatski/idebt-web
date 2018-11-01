import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const { MonthPicker } = DatePicker;

const CustomMonthPicker = ({ inlineLabel, ...props }) => (
  <div className={classNames('date-picker-control-container', { inline__label: inlineLabel })}>
    <MonthPicker {...props} dropdownClassName="date-picker-control-dropdown" />
  </div>
);

CustomMonthPicker.propTypes = {
  inlineLabel: PropTypes.bool,
};

export default CustomMonthPicker;
