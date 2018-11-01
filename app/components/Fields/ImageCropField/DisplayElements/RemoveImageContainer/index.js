import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default function RevomableImage({ onRemove, children, ...props }) {
  const showRemoveIcon = onRemove && !props.disabled;
  return (
    <div className="image-crop-container">
      {showRemoveIcon && (
        <span onClick={onRemove}>
          <Icon type="close" className="close-icon" />
        </span>
      )}
      {children}
    </div>
  );
}

RevomableImage.propTypes = {
  children: PropTypes.element,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};
