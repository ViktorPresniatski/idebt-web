import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'antd';
import { GreenButton } from 'components/Controls';
import { InputField } from 'components/Fields';
import { compose } from 'redux';
import { required, equalWithPassword, minLength8 } from 'utils/validations';
import messages from './messages';
import * as styles from './styles';

class AccountPasswordForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form style={styles.form} onSubmit={handleSubmit}>
        <Row type="flex" justify="center" align="top">
          <Col md={22} lg={18} xl={12}>
            <Field
              label={'Current password'}
              type="password"
              name="current_password"
              autoComplete="off"
              component={InputField}
              validate={required}
            />
            <Field
              label={'New password'}
              type="password"
              name="password"
              autoComplete="off"
              component={InputField}
              validate={[required, minLength8]}
            />
            <Field
              label={'Confirm new password'}
              type="password"
              name="password_confirmation"
              autoComplete="off"
              component={InputField}
              validate={[required, equalWithPassword]}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="top">
          <GreenButton type="primary" htmlType="submit">
            Change password
          </GreenButton>
        </Row>
      </form>
    );
  }
}

AccountPasswordForm.propTypes = {
  clearSubmitErrors: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};

const withForm = reduxForm({
  form: 'AccountPasswordForm',
});

export default compose(
  withForm,
)(AccountPasswordForm);
