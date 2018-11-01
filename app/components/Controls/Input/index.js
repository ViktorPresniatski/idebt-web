import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from 'antd';

import './index.scss';

const CustomInput = ({ inlineLabel, label, ...props }) => (
  <div className={classNames('custom-input-container', { inline__label: inlineLabel })}>
    <Input {...props} autoComplete="off" />
  </div>
);

CustomInput.propTypes = {
  inlineLabel: PropTypes.bool,
  label: PropTypes.element,
};

export default CustomInput;
