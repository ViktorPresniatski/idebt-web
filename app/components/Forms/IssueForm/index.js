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

class IssueForm extends React.Component {
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
          name="amount"
          type="text"
          component={InputField}
          label="Amount"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="max_overpay"
          type="text"
          component={InputField}
          label="Maximum overpay"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <Field
          name="min_credit_period"
          type="text"
          component={InputField}
          label="Minimum credit period in days"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumber]}
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

IssueForm.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.any,
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
  intl: intlShape.isRequired,
};

const withForm = reduxForm({
  form: 'IssueForm',
});

export default compose(
  injectIntl,
  withForm,
)(IssueForm);
