import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';

import { required, email, onlyNumber, equalWithPassword, minLength8 } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
import './styles.scss';

class AccountPersonalInfoForm extends React.Component {
  handleIdentityChange = () => {
    if (this.props.invalid) {
      this.props.clearSubmitErrors();
    }
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Field name="first_name" component={InputField} label="First Name" validate={required} inlineLabel />
        <Field name="last_name" component={InputField} label="Last Name" validate={required} inlineLabel />
        <Field name="emp_title" component={InputField} label="Job title" validate={required} inlineLabel />
        <Field
          name="annual_income"
          component={InputField}
          label="Annual income, $"
          validate={[required, onlyNumber]}
          inlineLabel
        />
        <Field name="telephone" component={InputField} label="Phone number" validate={required} inlineLabel />
        <Field name="passport_number" component={InputField} label="Passport number" validate={required} inlineLabel />
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={submitting || invalid}>
            Save
          </GreenButton>
        </div>
      </form>
    );
  }
}

AccountPersonalInfoForm.propTypes = {
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
};

const withForm = reduxForm({
  form: 'AccountPersonalInfoForm',
  enableReinitialize: true,
});

const mapStateToProps = (state, ownProps) => {
  if (ownProps.user) {
    return {
      initialValues: {
        id: ownProps.user.id,
        first_name: ownProps.user.first_name,
        last_name: ownProps.user.last_name,
        emp_title: ownProps.user.emp_title,
        annual_income: ownProps.user.annual_income,
        telephone: ownProps.user.telephone,
        passport_number: ownProps.user.passport_number,
      },
    };
  }

  return {
    initialValues: {},
  };
};

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withForm,
)(AccountPersonalInfoForm);
