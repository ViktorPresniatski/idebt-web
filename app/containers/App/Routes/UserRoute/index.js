import React from 'react';
import PropTypes from 'prop-types';

import { isSparkxAdmin } from 'utils/helpers/userHelpers';
import ProtectedRoute from '../ProtectedRoute';

export default function UserRoute({ component: Component, ...rest }) {
  const checkPermissions = currentUser => !isSparkxAdmin(currentUser);
  const redirectTo = () => '/manage_database';

  return <ProtectedRoute {...rest} component={Component} checkPermissions={checkPermissions} redirectTo={redirectTo} />;
}

UserRoute.propTypes = {
  component: PropTypes.func,
  redirectTo: PropTypes.any,
};
