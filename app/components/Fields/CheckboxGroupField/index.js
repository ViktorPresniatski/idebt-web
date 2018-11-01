import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from 'immutable';
import { CheckboxGroupField as CheckboxGroupFormField } from 'redux-form-antd';

import './index.scss';

const CheckboxGroupField = ({ inlineLabel, ...props }) => {
  if (inlineLabel) {
    props.labelCol = { span: 8, offset: 0 };
    props.wrapperCol = { span: 16, offset: 0 };
  }

  if (List.isList(props.input.value)) {
    props.input.value = props.input.value.toJS();
  }

  return (
    <div className={classNames('form-checkbox-group', { inline__label: inlineLabel })}>
      <CheckboxGroupFormField {...props} />
    </div>
  );
};

CheckboxGroupField.propTypes = {
  input: PropTypes.object,
  inlineLabel: PropTypes.bool,
};

export default CheckboxGroupField;
