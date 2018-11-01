import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List } from 'immutable';
import { SelectField as SelectFormField } from 'redux-form-antd';

import './index.scss';

const SelectField = ({ inlineLabel, ...props }) => {
  if (inlineLabel) {
    props.labelCol = { span: 8, offset: 0 };
    props.wrapperCol = { span: 16, offset: 0 };
  }

  if (Number.isInteger(props.input.value)) {
    props.input.value = props.input.value.toString();
  }

  if (List.isList(props.input.value)) {
    props.input.value = props.input.value.toJS();
  }

  return (
    <div className={classNames('form-select', { inline__label: inlineLabel })}>
      <SelectFormField dropdownClassName="formSelectDrop" {...props} />
    </div>
  );
};

SelectField.propTypes = {
  input: PropTypes.object,
  inlineLabel: PropTypes.bool,
};

export default SelectField;
