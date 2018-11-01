import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'components/Controls';

export default class CheckboxField extends React.Component {
  componentWillMount() {
    if (this.props.input.value !== this.props.defaultValue) {
      this.props.input.onChange(this.props.input.value);
    }
  }

  onChange = event => this.props.input.onChange(event.target.checked);

  render() {
    const { label, input, ...props } = this.props;
    return (
      <Checkbox {...props} checked={!!input.value} onChange={this.onChange}>
        {label}
      </Checkbox>
    );
  }
}

CheckboxField.propTypes = {
  defaultValue: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
};
