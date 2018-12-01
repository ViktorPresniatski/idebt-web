import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import TabContent from 'components/DataDisplay/TabbedPage/TabContent';
import { TabbedPage } from 'components/DataDisplay';

import { getIssuesDebtsRequest, getOffersDebtsRequest } from './actions';

import DebtsOnIssues from './DebtsOnIssues';
import DebtsOnOffers from './DebtsOnOffers';

import reducer from './reducer';
import saga from './saga';
import './styles.scss';

const TABS = [{ key: 'issuesDebts', component: DebtsOnIssues }, { key: 'offersDebts', component: DebtsOnOffers }];

const TITLES = {
  issuesDebts: 'My debts',
  offersDebts: 'The debts on my offers',
};

class DebtsContainer extends React.PureComponent {
  componentWillMount() {
    this.props.getIssuesDebtsRequest();
    this.props.getOffersDebtsRequest();
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

DebtsContainer.propTypes = {
  location: PropTypes.object,
};

const mapDispatchToProps = {
  getIssuesDebtsRequest,
  getOffersDebtsRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'debts', reducer });
const withSaga = injectSaga({ key: 'debts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DebtsContainer);
