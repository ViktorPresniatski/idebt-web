import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';
import { RadioField } from 'components/Fields';
import { Row, Col } from 'antd';

import { required, onlyNumberWithFloat } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
import './styles.scss';

const OPERATIONS = [
  { label: 'Replenish', value: 'replenish' },
  { label: 'Withdraw', value: 'withdraw' },
];

class ManageBalanceForm extends React.Component {
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
          name="operationType"
          component={RadioField}
          label="Operation"
          options={OPERATIONS}
          validate={required}
          onChange={this.handleIdentityChange}
          validate={required}
          inlineLabel
        />
        <Field
          name="amount"
          component={InputField}
          label="Amount"
          onChange={this.handleIdentityChange}
          validate={[required, onlyNumberWithFloat]}
          inlineLabel
        />
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={invalid}>
            Perform
          </GreenButton>
        </div>
      </form>
    );
  }
}

ManageBalanceForm.propTypes = {
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
};

const withForm = reduxForm({
  form: 'ManageBalanceForm',
});

export default compose(
  withForm,
)(ManageBalanceForm);
