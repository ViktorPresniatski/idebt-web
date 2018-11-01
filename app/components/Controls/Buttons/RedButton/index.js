import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const RedButton = props => <Button {...props} className={`button button_red ${props.className}`} />;

RedButton.propTypes = {
  className: PropTypes.string,
};

export default RedButton;
