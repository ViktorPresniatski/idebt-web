import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Collapse, Row, Col, notification } from 'antd';
import { GreenButton, GreenBorderButton, RedButton } from 'components/Controls';

import { submitNewOfferRequest, closeOfferRequest } from '../actions';
import ModalWithTitle from 'components/Modals/ModalWithTitle';
import OfferForm from 'components/Forms/OfferForm';
import { makeSelectOffers } from '../selectors';
import '../styles.scss';

const Panel = Collapse.Panel;

class OffersList extends React.Component {
  state = {
    isModalOpened: false,
  };

  onSubmit = formData => {
    const data = formData.toJS();
    const { intl } = this.props;

    return new Promise((resolve, reject) => {
      const handleErrors = errors => {
        reject(new SubmissionError(errors));
      };

      const handleSuccess = () => {
        resolve();

        notification.success({
          message: 'Success',
        });
        this.closeModal();
      };

      this.props.submitNewOfferRequest({ data, handleSuccess, handleErrors });
    });
  };

  closeOffer = offerId => e => {
    e.stopPropagation();
    this.props.closeOfferRequest({ id: offerId });
  };

  openModal = () => {
    this.setState({ isModalOpened: true });
  };

  closeModal = () => {
    this.setState({ isModalOpened: false });
  };

  renderHeader = offer => (
    <div>
      <span>{`ID: ${offer.id}. Offer with fund ${offer.credit_fund}`}</span>
      <RedButton className="close-claim-button" onClick={this.closeOffer(offer.id)}>
        x
      </RedButton>
    </div>
  );

  render() {
    const { offers } = this.props;

    if (!offers || offers.results.length === 0) {
      return <div className="content__wrapper empty-message">There are no offers yet</div>;
    }

    return (
      <div className="content__wrapper monthly-questions-wrapper">
        <div>
          <div className="form-wrapper">
            <Collapse>
              {offers.results.map(offer => (
                <Panel header={this.renderHeader(offer)} key={offer.id}>
                  <Row justify="center" className="wisdom-container">
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Fund
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.credit_fund}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Minimum loan size
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.min_loan_size}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Maximum loan size
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.max_loan_size}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Credit percentage
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.credit_percentage} %
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        With capitalization
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.is_with_capitalization ? 'Yes' : 'No'}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Grace period
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.grace_period} days
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Return period
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {offer.return_period} days
                      </Col>
                    </Row>
                    <Row>
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        <a href={`/search?target=offers&object_id=${offer.id}`}>
                          <GreenBorderButton>Search suitable issues</GreenBorderButton>
                        </a>
                      </Col>
                    </Row>
                  </Row>
                </Row>
                </Panel>
              ))}
            </Collapse>
            <GreenButton type="primary" onClick={this.openModal}>
              Create new offer
            </GreenButton>
            {this.state.isModalOpened && (
              <ModalWithTitle
                visible={this.state.isModalOpened}
                closeModal={this.closeModal}
                title={
                  <p>
                    <b>Create new offer</b>
                  </p>
                }
                className="wisdom-form-modal"
              >
                <OfferForm onCancel={this.closeModal} onSubmit={this.onSubmit} />
              </ModalWithTitle>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  offers: makeSelectOffers(),
});

const mapDispatchToProps = {
  closeOfferRequest,
  submitNewOfferRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(OffersList);
