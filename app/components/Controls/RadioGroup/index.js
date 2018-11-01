import React from 'react';
import { Radio } from 'antd';

import './index.scss';

const AntRadioGroup = Radio.Group;

const RadioGroup = props => (
  <div className="custom-radio-group-container">
    <AntRadioGroup {...props} />
  </div>
);

export default RadioGroup;
