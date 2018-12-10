import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';
import { CheckboxField } from 'components/Fields';
import { Row, Col } from 'antd';

import { required, email, onlyNumber, onlyNumberWithFloat, equalWithPassword } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
import './styles.scss';

class OfferForm extends React.Component {
  handleIdentityChange = () => {
    if (this.props.invalid) {
      this.props.clearSubmitErrors();
    }
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Field
          name="credit_fund"
          type="text"
          component={InputField}
          label="Credit fund"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="min_loan_size"
          type="text"
          component={InputField}
          label="Minimum loan size"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="max_loan_size"
          type="text"
          component={InputField}
          label="Maximum loan size"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="credit_percentage"
          type="text"
          component={InputField}
          label="Credit percentage"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="grace_period"
          type="text"
          component={InputField}
          label="Grace period in days"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumber]}
          inlineLabel
        />
        <Field
          name="return_period"
          type="text"
          component={InputField}
          label="Return period in days"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumber]}
          inlineLabel
        />
        <Field
          name="is_with_capitalization"
          component={CheckboxField}
          label="With capitalization"
          onChange={this.handleIdentityChange}
          inlineLabel
        />
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={submitting || invalid}>
            Save
          </GreenButton>
        </div>
      </form>
    );
  }
}

OfferForm.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.any,
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
  intl: intlShape.isRequired,
};

const withForm = reduxForm({
  form: 'OfferForm',
});

export default compose(
  injectIntl,
  withForm,
)(OfferForm);
