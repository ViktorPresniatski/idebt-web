import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const CustomDatePickerField = ({ inlineLabel, ...props }) => (
  <div className={classNames('date-picker-control-container', { inline__label: inlineLabel })}>
    <DatePicker {...props} dropdownClassName="date-picker-control-dropdown" />
  </div>
);

CustomDatePickerField.propTypes = {
  inlineLabel: PropTypes.bool,
};

export default CustomDatePickerField;
