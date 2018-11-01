import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const GreenButton = props => <Button {...props} className={`button button_green ${props.className}`} />;

GreenButton.propTypes = {
  className: PropTypes.string,
};

export default GreenButton;
