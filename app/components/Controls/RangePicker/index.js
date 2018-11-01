import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DatePicker } from 'antd';

import './index.scss';

const { RangePicker } = DatePicker;

const CustomRangePicker = props => {
  const { value } = props;
  const emptyPicker = !(value === undefined || (value && value.length !== 0));

  return (
    <div className={classNames('custom-range-picker-container', { 'empty-picker': emptyPicker })}>
      <RangePicker
        {...props}
        dropdownClassName={classNames('range-picker-field-dropdown', { 'empty-picker': emptyPicker })}
      />
    </div>
  );
};

CustomRangePicker.propTypes = {
  value: PropTypes.any,
};

export default CustomRangePicker;
