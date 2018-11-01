import React from 'react';
import PropTypes from 'prop-types';

import { IconInfo } from 'components/Svgs';
import Tooltip from 'components/DataDisplay/Tooltip';

import './styles.scss';

const InfoTooltip = props => (
  <Tooltip {...props}>
    <div className="help__icon">
      <IconInfo />
    </div>
  </Tooltip>
);

InfoTooltip.propTypes = {
  className: PropTypes.string,
};

export default InfoTooltip;
