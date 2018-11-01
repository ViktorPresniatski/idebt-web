import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RadioField as RadioFormField } from 'redux-form-antd';

import './index.scss';

const RadioField = ({ inlineLabel, ...props }) => {
  if (inlineLabel) {
    props.labelCol = { span: 8, offset: 0 };
    props.wrapperCol = { span: 16, offset: 0 };
  }
  return (
    <div className={classNames('radio_field', { inline__label: inlineLabel })}>
      <RadioFormField {...props} />
    </div>
  );
};

RadioField.propTypes = {
  inlineLabel: PropTypes.bool,
};

export default RadioField;
