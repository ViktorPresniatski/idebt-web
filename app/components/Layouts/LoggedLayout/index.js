import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { intlShape, injectIntl } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import LayoutTopHeader from 'containers/Headers/LayoutTopHeader';
import UserSidebar from 'containers/Sidebars/UserSidebar';
import { isSparkxAdmin } from 'utils/helpers/userHelpers';

import { IconAnswer, IconDashboard, IconProfile, IconShared } from 'components/Svgs';

import BaseLoggedLayout from 'components/Layouts/BaseLoggedLayout';

import messages from './messages';

class LoggedLayout extends React.PureComponent {
  getHeader = () => <LayoutTopHeader currentUser={this.props.currentUser} />;

  getRoutes = () => {
    const { intl, currentUser } = this.props;

    const commonRoutes = [
      { name: intl.formatMessage(messages.dashboardLink), link: '/', icon: IconDashboard },
      { name: 'Debts', link: '/debts', icon: IconShared },
      { name: intl.formatMessage(messages.profileLink), link: '/profile', icon: IconProfile },
    ];

    return commonRoutes;
  };

  getSidebarLogo = () => <UserSidebar currentUser={this.props.currentUser} />;

  render() {
    const { currentUser, children } = this.props;

    return (
      <BaseLoggedLayout
        currentUser={currentUser}
        header={this.getHeader()}
        sidebarLogo={this.getSidebarLogo()}
        routes={this.getRoutes()}
      >
        {children}
      </BaseLoggedLayout>
    );
  }
}

LoggedLayout.propTypes = {
  intl: intlShape.isRequired,
  currentUser: PropTypes.object,
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(LoggedLayout);
