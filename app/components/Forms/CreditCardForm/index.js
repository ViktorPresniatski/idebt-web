import React from 'react';
import PropTypes from 'prop-types';
import payment from 'payment';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { CheckboxField } from 'components/Fields';
import { Row, Col } from 'antd';

import { required, onlyNumber } from 'utils/validations';
import { InputField } from 'components/Fields';
import { GreenButton } from 'components/Controls';
// import './styles.scss';

class CreditCardForm extends React.Component {
  handleIdentityChange = () => {
    if (this.props.invalid) {
      this.props.clearSubmitErrors();
    }
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col>
            <Field
              name="card_number"
              type="text"
              component={InputField}
              onChange={this.handleIdentityChange}
              placeholder={'Card Number'}
              validate={required}
            />
          </Col>
        </Row>
        <Row gutter={16} className="wisdom-info-modal-row">        
          <Col>
            <Field
              name="cardholder_name"
              type="text"
              component={InputField}
              placeholder={'Cardholder Name'}
              onChange={this.handleIdentityChange}
              validate={required}
            />
          </Col>
        </Row>
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col span={18}>
            <Field
              name="valid_thru"
              type="text"
              component={InputField}
              placeholder={'Valid Thru'}
              onChange={this.handleIdentityChange}
              validate={required}
            />
          </Col>
          <Col span={6}>
            <Field
              name="cvc"
              type="text"
              component={InputField}
              placeholder={'CVC'}
              onChange={this.handleIdentityChange}
              validate={[required, onlyNumber]}
            />
          </Col>
        </Row>
        <div className="center">
          <GreenButton type="primary" htmlType="submit" disabled={submitting || invalid}>
            Save
          </GreenButton>
        </div>
      </form>
    );
  }
}

CreditCardForm.propTypes = {
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
};

const withForm = reduxForm({
  form: 'CreditCardForm',
});

export default compose(
  withForm,
)(CreditCardForm);
