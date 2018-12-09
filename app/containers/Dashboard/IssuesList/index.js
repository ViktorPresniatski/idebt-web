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

import { submitNewIssueRequest, closeIssueRequest } from '../actions';
import ModalWithTitle from 'components/Modals/ModalWithTitle';
import IssueForm from 'components/Forms/IssueForm';
import { makeSelectIssues } from '../selectors';
import '../styles.scss';

const Panel = Collapse.Panel;

class IssuesList extends React.Component {
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

      this.props.submitNewIssueRequest({ data, handleSuccess, handleErrors });
    });
  };

  closeIssue = offerId => e => {
    e.stopPropagation();
    this.props.closeIssueRequest({ id: offerId });
  };

  openModal = () => {
    this.setState({ isModalOpened: true });
  };

  closeModal = () => {
    this.setState({ isModalOpened: false });
  };

  renderHeader = issue => (
    <div>
      <span>{`ID: ${issue.id}. Issue with required amount ${issue.amount}`}</span>
      <RedButton className="close-claim-button" onClick={this.closeIssue(issue.id)}>
        x
      </RedButton>
    </div>
  );

  render() {
    const { issues } = this.props;

    if (!issues || issues.results.length === 0) {
      return <div className="content__wrapper empty-message">There are no issues yet</div>;
    }

    return (
      <div className="content__wrapper monthly-questions-wrapper">
        <div>
          <div className="form-wrapper">
            <Collapse>
              {issues.results.map(issue => (
                <Panel header={this.renderHeader(issue)} key={issue.id}>
                  <Row justify="center" className="wisdom-container">
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Amount
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {issue.amount}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Maximum overpay
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {issue.max_overpay}
                      </Col>
                    </Row>
                    <Row gutter={16} className="wisdom-info-modal-row">
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        Minimum credit period in days
                      </Col>
                      <Col span={8} className="wisdom-info-modal-column-content">
                        {issue.min_credit_period}
                      </Col>
                    </Row>
                    <Row>
                      <Col offset={4} span={12} className="wisdom-info-modal-column-label">
                        <a href={`/search?target=issues&object_id=${issue.id}`}>
                          <GreenBorderButton>Search suitable offers</GreenBorderButton>
                        </a>
                      </Col>
                    </Row>
                  </Row>
                </Panel>
              ))}
            </Collapse>
            <GreenButton type="primary" onClick={this.openModal}>
              Create new issue
            </GreenButton>
            {this.state.isModalOpened && (
              <ModalWithTitle
                visible={this.state.isModalOpened}
                closeModal={this.closeModal}
                title={
                  <p>
                    <b>Create new issue</b>
                  </p>
                }
                className="wisdom-form-modal"
              >
                <IssueForm onCancel={this.closeModal} onSubmit={this.onSubmit} />
              </ModalWithTitle>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  issues: makeSelectIssues(),
});

const mapDispatchToProps = {
  submitNewIssueRequest,
  closeIssueRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(IssuesList);
