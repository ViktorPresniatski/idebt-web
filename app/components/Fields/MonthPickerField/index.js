import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MonthPickerField as MonthPicker } from 'redux-form-antd';

import './index.scss';

const MonthPickerField = ({ inlineLabel, ...props }) => {
  if (inlineLabel) {
    props.labelCol = { span: 8, offset: 0 };
    props.wrapperCol = { span: 16, offset: 0 };
  }
  return (
    <div className={classNames('date-picker-field-container', { inline__label: inlineLabel })}>
      <MonthPicker {...props} dropdownClassName="date-picker-field-dropdown" />
    </div>
  );
};

MonthPickerField.propTypes = {
  inlineLabel: PropTypes.bool,
};

export default MonthPickerField;
