import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import TabContent from 'components/DataDisplay/TabbedPage/TabContent';
import { TabbedPage } from 'components/DataDisplay';

import { getIssuesRequest, getOffersRequest } from './actions';

import IssuesList from './IssuesList';
import OffersList from './OffersList';

import reducer from './reducer';
import saga from './saga';
import './styles.scss';

const TABS = [{ key: 'issues', component: IssuesList }, { key: 'offers', component: OffersList }];

const TITLES = {
  issues: 'Issues',
  offers: 'Offers',
};

class MyAnswers extends React.PureComponent {
  componentWillMount() {
    this.props.getIssuesRequest();
    this.props.getOffersRequest();
  }

  render() {
    const { location } = this.props;
    const params = queryString.parse(location.search);

    return (
      <TabbedPage
        defaultTab={params.tab || TABS[0].key}
        className="my_answers"
        headerBody={<h1 className="content__title__text">Dashboard</h1>}
      >
        {TABS.map(tab => {
          const Component = tab.component;
          return (
            <TabContent key={tab.key} tabKey={tab.key} title={TITLES[tab.key]}>
              <Component />
            </TabContent>
          );
        })}
      </TabbedPage>
    );
  }
}

MyAnswers.propTypes = {
  location: PropTypes.object,
};

const mapDispatchToProps = {
  getIssuesRequest,
  getOffersRequest,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  injectIntl,
  withReducer,
  withSaga,
  withConnect,
)(MyAnswers);
