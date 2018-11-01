import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SliderField from 'components/Fields/SliderField';

import messages from './messages';

export default class AccountSetupNumberOfMonthsField extends React.Component {
  yearsOfExperienceFormat = value => {
    const years = Math.trunc(value / 12);
    return years > 0 ? 11 + years : value;
  };

  yearsOfExperienceTipFormat = value => {
    const years = value - 11;
    return years > 0
      ? this.valueToFormattedMessage(years, messages.years)
      : this.valueToFormattedMessage(value, messages.months);
  };

  valueToFormattedMessage = (value, message) => (
    <FormattedMessage {...Object.assign({}, message, { values: { count: value } })} />
  );

  parseValue = value => {
    const years = value - 11;
    return years > 0 ? years * 12 : value;
  };

  render() {
    const { maxYears } = this.props;

    return (
      <SliderField
        {...this.props}
        range={false}
        min={0}
        max={11 + maxYears}
        step={1}
        parse={this.parseValue}
        format={this.yearsOfExperienceFormat}
        tipFormatter={this.yearsOfExperienceTipFormat}
        alwaysShowTooltip
        inlineLabel
        showButtons
      />
    );
  }
}

AccountSetupNumberOfMonthsField.propTypes = {
  name: PropTypes.string,
  maxYears: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
