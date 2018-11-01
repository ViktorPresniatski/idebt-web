import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator';

const SIGN_IN_ROUTE = '/sign_in';
const DEFAULT_RETURN_ROUTE = '/';

const redirectByStatus = user => {
  switch (user.status) {
    case 'company_creation':
      return '/company_creation';
    case 'segment_creation':
      return '/segment_creation';
    case 'account_setup':
      return '/account_setup';
    default:
      return '/';
  }
};

const ProtectedRoute = ({ component: Component, currentUser, redirectTo, checkPermissions, ...rest }) => {
  if (!localStorage.getItem('auth_token')) {
    return <Route {...rest} render={() => <Redirect to={redirectTo ? redirectTo(currentUser) : SIGN_IN_ROUTE} />} />;
  }

  if (currentUser) {
    if (['company_creation', 'segment_creation', 'account_setup'].includes(currentUser.status)) {
      const redirectPath = redirectByStatus(currentUser);
      return (
        <Route
          {...rest}
          render={props => (rest.path === redirectPath ? <Component {...props} /> : <Redirect to={redirectPath} />)}
        />
      );
    }
    const isPermitted = checkPermissions ? checkPermissions(currentUser) : true;
    const redirectPath = redirectTo ? redirectTo(currentUser) : DEFAULT_RETURN_ROUTE;

    return (
      <Route {...rest} render={props => (isPermitted ? <Component {...props} /> : <Redirect to={redirectPath} />)} />
    );
  }
  return <Route {...rest} render={() => <LoadingIndicator />} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  redirectTo: PropTypes.any,
  currentUser: PropTypes.object,
  checkPermissions: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export default connect(
  mapStateToProps,
  null,
)(ProtectedRoute);
