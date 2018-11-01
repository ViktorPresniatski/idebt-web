import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NumberField } from 'redux-form-antd';

import './index.scss';

const InputField = ({ inlineLabel, ...props }) => {
  if (inlineLabel) {
    props.labelCol = { span: 8, offset: 0 };
    props.wrapperCol = { span: 16, offset: 0 };
  }
  return (
    <div className={classNames('input-field-container', { inline__label: inlineLabel })}>
      <NumberField {...props} />
    </div>
  );
};

InputField.propTypes = {
  inlineLabel: PropTypes.bool,
};

export default InputField;
