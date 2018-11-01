import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import Image from './Image';
import Video from './Video';
import './index.scss';

export default function MediaDisplayElement({ type, onRemove, ...props }) {
  const showRemoveIcon = onRemove && !props.disabled;
  return (
    <div className="media-display-container">
      {showRemoveIcon && (
        <span onClick={onRemove}>
          <Icon type="close" className="close-icon" />
        </span>
      )}
      {type === 'video' ? <Video {...props} /> : <Image {...props} />}
    </div>
  );
}

MediaDisplayElement.propTypes = {
  type: PropTypes.string,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};
