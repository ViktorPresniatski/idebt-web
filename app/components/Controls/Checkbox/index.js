import React from 'react';
import { Checkbox } from 'antd';
import './styles.scss';

export default props => (
  <div className="form-checkbox">
    <Checkbox {...props} />
  </div>
);
