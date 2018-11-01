import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DatePicker } from 'components/Controls';

import './index.scss';

export default class DatePickerField extends React.PureComponent {
  onChange = (date, dateString) => this.props.input.onChange(dateString);

  render() {
    const { input, label, inlineLabel, className, ...props } = this.props;
    let controlClassName = 'ant-form-item-control-wrapper';
    let labelClassName = 'ant-form-item-label';
    if (inlineLabel && label) {
      labelClassName = classNames(labelClassName, 'ant-col-8');
      controlClassName = classNames(controlClassName, 'ant-col-16');
    }

    const value = input.value && typeof input.value === 'string' ? moment(input.value) : input.value;

    return (
      <div className={classNames('date-picker-field-container', className, { inline__label: inlineLabel })}>
        <div className="ant-form-item">
          {label && (
            <div className={labelClassName}>
              <div className="date-picker-field-label-text">{label}</div>
            </div>
          )}
          <div className={controlClassName}>
            <DatePicker
              {...props}
              value={value}
              onChange={this.onChange}
              dropdownClassName="date-picker-field-dropdown"
            />
          </div>
        </div>
      </div>
    );
  }
}

DatePickerField.propTypes = {
  defaultValue: PropTypes.object,
  className: PropTypes.string,
  inlineLabel: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
};
