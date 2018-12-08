import React from 'react';
import PropTypes from 'prop-types';
import AccountEdit from 'containers/AccountEdit';

export default class AccountEditPage extends React.PureComponent {
  render() {
    return <AccountEdit location={this.props.location} />;
  }
}

AccountEditPage.propTypes = {
  location: PropTypes.object,
};
