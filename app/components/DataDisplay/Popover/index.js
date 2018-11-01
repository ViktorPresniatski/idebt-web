import React from 'react';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const CustomPopover = ({ className = '', ...props }) => (
  <Popover {...props} className={classNames(className, 'custom-popover')} />
);

CustomPopover.propTypes = {
  className: PropTypes.string,
};

export default CustomPopover;
