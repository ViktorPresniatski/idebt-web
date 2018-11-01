import React from 'react';
import { Checkbox } from 'antd';
import './styles.scss';

const CheckboxGroup = Checkbox.Group;

export default props => (
  <div className="form-checkbox">
    <CheckboxGroup {...props} />
  </div>
);
