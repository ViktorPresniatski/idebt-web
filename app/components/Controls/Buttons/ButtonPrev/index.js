import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconArrowRight from 'components/Svgs/IconArrowRight';
import messages from './messages';

const ButtonPrev = ({ text, ...props }) => (
  <Button className="button button_border" {...props}>
    <span className="button__icon button__icon_prev">
      <IconArrowRight />
    </span>
    <FormattedMessage className="button__text" {...messages.backButtonText} />
  </Button>
);

ButtonPrev.propTypes = {
  text: PropTypes.string,
};

export default ButtonPrev;
