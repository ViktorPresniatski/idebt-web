import React from 'react';
import Cards from 'react-credit-cards';
import StarRatings from 'react-star-ratings';
import { Row, Col, notification } from 'antd';
import SubmissionError from 'redux-form/lib/SubmissionError';

import ModalWithTitle from 'components/Modals/ModalWithTitle';
import ManageBalanceForm from 'components/Forms/ManageBalanceForm';
import CreditCardForm from 'components/Forms/CreditCardForm';

import { manageBalanceRequest } from '../actions';
import './styles.scss';

class AccountStatus extends React.Component {
  state = {
    isModalOpened: false,
    isCreditCardModalOpened: false,
  };

  openModal = () => {
    this.setState({ isModalOpened: true });
  };

  openCreditCardModal = () => {
    this.setState({ isCreditCardModalOpened: true });
  };

  closeModal = () => {
    this.setState({ isModalOpened: false, isCreditCardModalOpened: false });
  };

  handleBalanceChange = (formData) => {
    const data = formData.toJS();
    data.userId = this.props.user.id;
    console.log(data);

    return new Promise((resolve, reject) => {
      const handleErrors = (errors) => {
        reject(new SubmissionError(errors));
      }

      const handleSuccess = () => {
        resolve();

        notification.success({
          message: 'Success',
        });
        this.closeModal();
      }

      this.props.manageBalance({ data, handleSuccess, handleErrors });
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div className="account-status-info">
        <div className="form-wrapper">
          <Row justify="center" className="wisdom-container">
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Balance
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.balance} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Debt outstanding amount
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.debt_outstanding_amount} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                The amount of interest on the loan
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.interest_amount} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Credit rating
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                <StarRatings
                  rating={user ? user.rating / 10 : 0}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name='rating'
                  starDimension="25px"
                  starSpacing="0px"
                />
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={21}>
                <a onClick={this.openModal}>Manage balance</a>
              </Col>
            </Row>
            {/*<Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={21}>
                <a onClick={this.openCreditCardModal}>Manage credit card</a>
              </Col>
            </Row>*/}
            <Row gutter={16} className="wisdom-info-modal-row">
              <Cards
                number={''}
                name={'Cardholder name'}
                expiry={''}
                cvc={123}
                preview={true}
              />
            </Row>
          </Row>
          {this.state.isModalOpened && (
            <ModalWithTitle
              visible={this.state.isModalOpened}
              closeModal={this.closeModal}
              title={
                <p>
                  <b>Manage balance</b>
                </p>
              }
              className="wisdom-form-modal"
            >
              <ManageBalanceForm onCancel={this.closeModal} onSubmit={this.handleBalanceChange} />
            </ModalWithTitle>
          )}
          {/*this.state.isCreditCardModalOpened && (
            <ModalWithTitle
              visible={this.state.isCreditCardModalOpened}
              closeModal={this.closeModal}
              title={
                <p>
                  <b>Manage credit card</b>
                </p>
              }
              className="wisdom-form-modal"
            >
              <CreditCardForm onCancel={this.closeModal} onSubmit={this.handleCreditCardChange} />
            </ModalWithTitle>
           )*/}
        </div>
      </div>
    );
  }
}

export default AccountStatus;
