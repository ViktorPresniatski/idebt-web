import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SIGN_IN_ROUTE = '/sign_in';

const RegisteredRoute = ({ component: Component, ...rest }) => {
  if (!localStorage.getItem('auth_token')) {
    return <Route {...rest} render={() => <Redirect to={SIGN_IN_ROUTE} />} />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

RegisteredRoute.propTypes = {
  component: PropTypes.func,
};

export default RegisteredRoute;
