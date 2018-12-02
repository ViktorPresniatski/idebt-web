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
import { makeSelectOffersDebts } from '../selectors';
import '../styles.scss';

const Panel = Collapse.Panel;

class DebtsOnOffers extends React.Component {
  render() {
    const { offersDebts } = this.props;
    console.log(offersDebts);

    return (
      <div className="content__wrapper monthly-questions-wrapper">
        <div>
          <div className="form-wrapper">
            <Collapse>
              {offersDebts &&
                offersDebts.results.map(debt => (
                  <Panel header={`ID: ${debt.id}. Debt with loan ${debt.loan_size}`} key={debt.id}>
                    <Debt debt={debt} />
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
  offersDebts: makeSelectOffersDebts(),
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
)(DebtsOnOffers);
