import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const REDIRECT_ROUTE = '/';

export default function AnonymousRoute({ component: Component, ...rest }) {
  if (localStorage.getItem('auth_token') && !rest.location.search) {
    return <Route {...rest} render={() => <Redirect to={REDIRECT_ROUTE} />} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

AnonymousRoute.propTypes = {
  component: PropTypes.func,
};
