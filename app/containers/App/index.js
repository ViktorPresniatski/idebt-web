import React from 'react';
import { compose } from 'redux';
import { Switch } from 'react-router-dom';
import 'video-react/dist/video-react.css';
import 'antd/dist/antd.css';

import LoggedLayout from 'components/Layouts/LoggedLayout';

import injectSaga from 'utils/injectSaga';
import HomePage from 'pages/HomePage/Loadable';
import SignInPage from 'pages/SignInPage/Loadable';
import SignUpPage from 'pages/SignUpPage/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import SearchPage from 'pages/SearchPage/Loadable';
import DebtsPage from 'pages/DebtsPage/Loadable';
import AccountEditPage from 'pages/AccountEditPage';

import AnonymousRoute from './Routes/AnonymousRoute';
import RegisteredRoute from './Routes/RegisteredRoute';
import UserRoute from './Routes/UserRoute';
import saga from './saga';

const App = () => {
  const CurrentLayout = LoggedLayout;

  return (
    <CurrentLayout>
      <Switch>
        <AnonymousRoute exact path="/sign_in/" component={SignInPage} />
        <AnonymousRoute exact path="/sign_up/" component={SignUpPage} />
        <RegisteredRoute exact path="/search" component={SearchPage} />
        <RegisteredRoute exact path="/debts" component={DebtsPage} />
        <RegisteredRoute exact path="/profile" component={AccountEditPage} />
        <RegisteredRoute exact path="/" component={HomePage} />
        <RegisteredRoute exact path="/not_found" component={NotFoundPage} />
        <RegisteredRoute component={NotFoundPage} />
      </Switch>
    </CurrentLayout>
  );
};

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
