import React from 'react';
import { Table } from 'antd';
import './index.scss';

const CustomTable = props => (
  <div className="custom-table-container">
    <Table {...props} />
  </div>
);

export default CustomTable;
