import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import './styles.scss';

const CustomTooltip = ({ children, ...props }) => (
  <Tooltip overlayClassName="info-tooltip" {...props}>
    {children}
  </Tooltip>
);

CustomTooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

export default CustomTooltip;
