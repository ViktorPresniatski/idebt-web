import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';

import { required, maxLength } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
import messages from './messages';
import './styles.scss';

const FIELDS_VALIDATIONS = {
  identity: [required, maxLength(255)],
  password: [required, maxLength(150)],
};

class SignInForm extends React.Component {
  handleIdentityChange = () => {
    if (this.props.invalid) {
      this.props.clearSubmitErrors();
    }
  };

  render() {
    const { handleSubmit, error, invalid, submitting } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="general-error-container">{error}</div>}
        <Field
          name="username"
          type="text"
          component={InputField}
          label={formatMessage(messages.emailFieldLabel)}
          placeholder={formatMessage(messages.emailFieldPlaceholder)}
          onChange={this.handleIdentityChange}
          validate={FIELDS_VALIDATIONS.identity}
        />
        <Field
          name="password"
          type="password"
          component={InputField}
          label={formatMessage(messages.passwordFieldLabel)}
          placeholder={formatMessage(messages.passwordFieldPlaceholder)}
          onChange={this.handleIdentityChange}
          validate={FIELDS_VALIDATIONS.password}
        />
        <div className="right forgot_password__link">
          <Link className="link" to="/recovery_password">
            {formatMessage(messages.forgotPasswordLinkText)}
          </Link>
        </div>
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={submitting || invalid}>
            {formatMessage(messages.signInButtonText)}
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
