import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { GreenButton } from 'components/Controls';
import { required, email } from 'utils/validations';
import { InputField } from 'components/Fields';

import './styles.scss';

class AccountEmailForm extends React.Component {

  render() {
    const { handleSubmit, user, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit} className="account-notifications-form">
        <Row
          type="flex"
          align="top"
          justify="center"
          className="account-notifications-form-email-notification-container"
        >
          <Col md={22} lg={20} xl={16}>
            <Field
              name="email"
              label={'Email'}
              type="email"
              autoComplete="off"
              component={InputField}
              validate={[required, email]}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="top">
          <GreenButton type="primary" htmlType="submit" disabled={invalid}>
            Change email
          </GreenButton>
        </Row>
      </form>
    );
  }
}

AccountEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  user: PropTypes.object,
};

const formName = 'AccountEmailForm';

const withForm = reduxForm({
  form: formName,
  enableReinitialize: true,
});

const mapStateToProps = (state, ownProps) => {
  if (ownProps.user) {
    return {
      initialValues: {
        id: ownProps.user.id,
        email: ownProps.user.email,
      },
    };
  }

  return {
    initialValues: {},
  };
};

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withConnect,
  withForm,
)(AccountEmailForm);
