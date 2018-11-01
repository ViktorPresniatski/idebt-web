import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconArrowRight from 'components/Svgs/IconArrowRight';
import messages from './messages';

const ButtonNext = props => (
  <Button className="button button_green" {...props}>
    <FormattedMessage className="button__text" {...messages.nextButtonText} />
    <span className="button__icon button__icon_next">
      <IconArrowRight />
    </span>
  </Button>
);

ButtonNext.propTypes = {
  text: PropTypes.string,
};

export default ButtonNext;
