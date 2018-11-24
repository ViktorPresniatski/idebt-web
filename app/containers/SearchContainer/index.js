import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Cards, { Card } from 'react-swipe-card';
import { Row, Col } from 'antd';

import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';
import { GreenButton } from 'components/Controls';

import Issue from './Issue';
import Offer from './Offer';
import { getSuitableIssuesRequest, getSuitableOffersRequest, createMatchRequest } from './actions';
import { makeSelectSuitableIssues, makeSelectSuitableOffers } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

const MAPPING = {
  issues: {
    action: 'getSuitableIssuesRequest',
    matchType: 'ISS',
    component: Offer,
  },
  offers: {
    action: 'getSuitableOffersRequest',
    matchType: 'OFF',
    component: Issue,
  },
};

class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const params = queryString.parse(props.location.search);
    this.target = params.target;
    this.object_id = params.object_id;

    this.state = {
      isEndButtonVisible: false,
    };
  }

  componentWillMount() {
    const { action } = MAPPING[this.target];
    this.props[action]({ id: this.object_id });
  }

  onEnd = () => {
    this.setState({ isEndButtonVisible: true });
  };

  handleDecline = () => {
    console.log('DECLINE');
  };

  handleAccept = to => {
    const data = { from_id: this.object_id, to_id: to, match_type: MAPPING[this.target].matchType };
    this.props.createMatchRequest(data);
  };

  render() {
    const data = this.props[this.target];
    if (!data) {
      return <LoadingIndicator />;
    }
    const Component = MAPPING[this.target].component;
    const { isEndButtonVisible } = this.state;
    const isEmpty = data.results.length === 0;

    console.log(data.results);

    return (
      <div className="master-root-wrapper">
        {!isEmpty && !isEndButtonVisible ? (
          <Cards className="master-root" onEnd={this.onEnd}>
            {data.results.map(item => (
              <Card key={item.id} onSwipeLeft={this.handleDecline} onSwipeRight={() => this.handleAccept(item.id)}>
                <Component item={item} />
              </Card>
            ))}
          </Cards>
        ) : (
          <div className="return-button">
            <p>There is no data available</p>
            <a href="/" className="">
              <GreenButton>Back to dashboard</GreenButton>
            </a>
          </div>
        )}
      </div>
    );
  }
}

SearchContainer.propTypes = {
  location: PropTypes.object,
};

const mapDispatchToProps = {
  getSuitableIssuesRequest,
  getSuitableOffersRequest,
  createMatchRequest,
};

const mapStateToProps = createStructuredSelector({
  issues: makeSelectSuitableIssues(),
  offers: makeSelectSuitableOffers(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  injectIntl,
  withReducer,
  withSaga,
  withConnect,
)(SearchContainer);
