import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextAreaField } from 'redux-form-antd';

import './styles.scss';

class TextAriaField extends React.Component {
  checkMaxLength = () => this.props.countdown < this.props.input.value.length;

  render() {
    const { countdown, ...props } = this.props;

    const hasMaxLengthError = countdown && props.meta.touched && this.checkMaxLength();
    const textAreaClasses = classNames('form-textarea', {
      'form-textarea-with-countdown': countdown,
    });
    const textAreaNumberClasses = classNames('form-textarea__number', {
      'form-textarea__number__error': hasMaxLengthError,
    });

    return (
      <div className={textAreaClasses}>
        <TextAreaField {...props} />
        <div className="form-textarea__number_container">
          <span className={textAreaNumberClasses}>
            {props.input.value.length}/{countdown}
          </span>
        </div>
      </div>
    );
  }
}

TextAriaField.propTypes = {
  countdown: PropTypes.number,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default TextAriaField;
