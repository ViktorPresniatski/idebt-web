import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import SignIn from 'containers/SignIn';

class SignInPage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <SignIn location={this.props.location} history={this.props.history} />
      </Layout>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SignInPage;
