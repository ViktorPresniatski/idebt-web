import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';

import { required, email, onlyNumberWithFloat, equalWithPassword, minLength8 } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
import './styles.scss';

class SignInForm extends React.Component {
  handleIdentityChange = () => {
    if (this.props.invalid) {
      this.props.clearSubmitErrors();
    }
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={InputField}
          label="Username"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="password"
          type="password"
          component={InputField}
          label="Password"
          onChange={this.handleIdentityChange}
          validate={[required, minLength8]}
          inlineLabel
        />
        <Field
          name="password_confirmation"
          type="password"
          component={InputField}
          label="Password confirmation"
          onChange={this.handleIdentityChange}
          validate={[required, equalWithPassword]}
          inlineLabel
        />
        <Field
          name="first_name"
          type="text"
          component={InputField}
          label="First Name"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="last_name"
          type="text"
          component={InputField}
          label="Last Name"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="email"
          type="email"
          component={InputField}
          label="Email"
          onChange={this.handleIdentityChange}
          validate={[required, email]}
          inlineLabel
        />
        <Field
          name="emp_title"
          type="text"
          component={InputField}
          label="Job title"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="annual_income"
          type="text"
          component={InputField}
          label="Annual income, $"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="telephone"
          type="text"
          component={InputField}
          label="Phone number"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="passport_number"
          type="text"
          component={InputField}
          label="Passport number"
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={submitting || invalid}>
            Sign up
          </GreenButton>
        </div>
      </form>
    );
  }
}

SignInForm.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.any,
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
  intl: intlShape.isRequired,
};

const withForm = reduxForm({
  form: 'SignInForm',
});

export default compose(
  injectIntl,
  withForm,
)(SignInForm);
