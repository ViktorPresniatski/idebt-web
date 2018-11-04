import React from 'react';
import { message } from 'antd';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import SubmissionError from 'redux-form/lib/SubmissionError';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { processErrors } from 'utils/helpers/common';
import SignInForm from 'components/Forms/SignInForm';
import { signInRequest } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

export class SignIn extends React.PureComponent {
  submitSignInForm = formData => {
    const data = formData.toJS();

    return new Promise((resolve, reject) => {
      const handleErrors = errors => {
        reject(new SubmissionError(processErrors(errors)));
      };

      this.props.signInRequest({ data, handleErrors });
    });
  };

  render() {
    const { location, isTokenChecked } = this.props;
    return (
      <div className="content__wrapper">
        <h2 className="content__title__text">
          <FormattedMessage {...messages.signInTitle} />
        </h2>
        <a href="/sign_up" className="sign-up-link">
          Sign up
        </a>
        <div className="form__block form__block_small">
          <SignInForm onSubmit={this.submitSignInForm} />
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signInRequest: PropTypes.func,
};

const mapDispatchToProps = {
  signInRequest,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sign_in', reducer });
const withSaga = injectSaga({ key: 'sign_in', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignIn);
