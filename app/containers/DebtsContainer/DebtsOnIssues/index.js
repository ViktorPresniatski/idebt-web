import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Collapse, Row, Col, notification } from 'antd';
import { GreenButton, GreenBorderButton } from 'components/Controls';

import Debt from '../Debt';
import { repayDebtRequest } from '../actions';
import ModalWithTitle from 'components/Modals/ModalWithTitle';
import { makeSelectIssuesDebts } from '../selectors';
import '../styles.scss';

const Panel = Collapse.Panel;

class DebtsOnIssues extends React.Component {
  onRepayButtonClick = debtId => {
    const handleErrors = errors => {
      notification.error({ message: errors.message });
    };

    const handleSuccess = () => {
      notification.success({
        message: 'Success',
      });
    };

    const data = { id: debtId };
    this.props.repayDebtRequest({ data, handleSuccess, handleErrors });
  };

  renderPayButton = debt => (
    <Row>
      <Col offset={7} span={12} className="wisdom-info-modal-column-label">
        <GreenBorderButton onClick={() => this.onRepayButtonClick(debt.id)}>Repay</GreenBorderButton>
      </Col>
    </Row>
  );

  render() {
    const { issuesDebts } = this.props;

    if (!issuesDebts || issuesDebts.results.length === 0) {
      return <div className="content__wrapper empty-message">There are no debts yet</div>;
    }

    return (
      <div className="content__wrapper monthly-questions-wrapper">
        <div>
          <div className="form-wrapper">
            <Collapse>
              {issuesDebts.results.map(debt => (
                <Panel header={`ID: ${debt.id}. Debt with loan ${debt.current_size} $`} key={debt.id}>
                  <Debt debt={debt} debtType="issues" button={this.renderPayButton(debt)} />
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  issuesDebts: makeSelectIssuesDebts(),
});

const mapDispatchToProps = {
  repayDebtRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(DebtsOnIssues);
