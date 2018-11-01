import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

const { Option } = Select;

const CustomSelect = ({ options, ...props }) => (
  <div className="select-container">
    <Select {...props}>
      {options.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  </div>
);

CustomSelect.propTypes = {
  options: PropTypes.array,
};

export default CustomSelect;
