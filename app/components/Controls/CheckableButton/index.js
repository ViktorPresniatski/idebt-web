import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const CheckableButton = ({ text, checked, className, ...props }) => (
  <div className={classNames('checkable-button', className, { checked })} {...props}>
    <span className="checkable-button-text">{text}</span>
  </div>
);

CheckableButton.propTypes = {
  text: PropTypes.element,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

export default CheckableButton;
