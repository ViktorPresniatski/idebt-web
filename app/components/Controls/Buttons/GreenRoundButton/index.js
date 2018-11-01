import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const GreenRoundButton = ({ className, ...props }) => (
  <Button {...props} className={`button button_green round-button ${className}`} />
);

GreenRoundButton.propTypes = {
  className: PropTypes.string,
};

export default GreenRoundButton;
