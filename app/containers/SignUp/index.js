import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { message } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import SubmissionError from 'redux-form/lib/SubmissionError';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { processErrors } from 'utils/helpers/common';
import SignUpForm from 'components/Forms/SignUpForm';
import { signUpRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

export class SignUp extends React.PureComponent {
  submitSignUpForm = formData => {
    const data = formData.toJS();

    return new Promise((resolve, reject) => {
      const handleErrors = errors => {
        reject(new SubmissionError(processErrors(errors)));
      };

      this.props.signUpRequest({ data, handleErrors });
    });
  };

  render() {
    const { location, isTokenChecked } = this.props;
    return (
      <div className="content__wrapper">
        <h2 className="content__title__text">Register your account</h2>
        <a href="/sign_in" className="sign-up-link">
          Log in
        </a>
        <Row type="flex" justify="center" align="top">
          <Col span={14}>
            <SignUpForm onSubmit={this.submitSignUpForm} />
          </Col>
        </Row>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpRequest: PropTypes.func,
};

const mapDispatchToProps = {
  signUpRequest,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sign_up', reducer });
const withSaga = injectSaga({ key: 'sign_up', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUp);
