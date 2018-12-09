import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionError from 'redux-form/lib/SubmissionError';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { getCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';

import HalfPlate from 'components/Layouts/StyledComponents/HalfPlate';
import PlateTitle from 'components/Layouts/StyledComponents/PlateTitle';

import AccountPasswordForm from 'components/Forms/AccountEditForms/AccountPasswordForm';
import AccountEmailForm from 'components/Forms/AccountEditForms/AccountEmailForm';
import AccountPersonalInfoForm from 'components/Forms/AccountEditForms/AccountPersonalInfoForm';

import AccountStatus from './AccountStatus';
import { currentUserUpdateRequest, updateCurrentUserPasswordRequest, manageBalanceRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

class AccountEdit extends React.PureComponent {
  componentWillMount() {
    this.props.getCurrentUserRequest();
  }

  handleSubmit = formData => {
    const data = formData.toJS();

    return new Promise((resolve, reject) => {
      const handleErrors = errors => {
        reject(new SubmissionError(errors));
      };

      const handleSuccess = () => {
        resolve();

        notification.success({
          message: 'Profile info updated',
        });
      };

      this.props.currentUserUpdateRequest({ data, handleErrors, handleSuccess });
    });
  };

  handlePasswordChange = (formData, dispatch) => {
    const data = formData.toJS();
    data.id = this.props.currentUser.id;

    return new Promise((resolve, reject) => {
      const handleErrors = errors => {
        reject(new SubmissionError(errors));
      };

      const handleSuccess = () => {
        resolve();

        notification.success({
          message: 'Password changed',
        });
        dispatch(reset('AccountPasswordForm'));
      };

      console.log(data);
      this.props.updateCurrentUserPasswordRequest({ data, handleErrors, handleSuccess });
    });
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className="account-edit-container">
        <div className="account-edit-container-row">
          <HalfPlate>
            <PlateTitle>Account status</PlateTitle>
            <AccountStatus user={currentUser} manageBalance={this.props.manageBalanceRequest} />
          </HalfPlate>
          <HalfPlate>
            <PlateTitle>Update profile info</PlateTitle>
            <AccountPersonalInfoForm user={currentUser} onSubmit={this.handleSubmit} />
          </HalfPlate>
        </div>
        <div className="account-edit-container-row">
          <HalfPlate>
            <PlateTitle>Change email</PlateTitle>
            <AccountEmailForm user={currentUser} onSubmit={this.handleSubmit} />
          </HalfPlate>
          <HalfPlate>
            <PlateTitle>Change password</PlateTitle>
            <AccountPasswordForm onSubmit={this.handlePasswordChange} />
          </HalfPlate>
        </div>
      </div>
    );
  }
}

AccountEdit.propTypes = {};

const mapDispatchToProps = {
  manageBalanceRequest,
  getCurrentUserRequest,
  currentUserUpdateRequest,
  updateCurrentUserPasswordRequest,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'account_edit', reducer });
const withSaga = injectSaga({ key: 'account_edit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountEdit);
