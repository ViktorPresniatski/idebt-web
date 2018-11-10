import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import SignUp from 'containers/SignUp';

class SignUpPage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <SignUp location={this.props.location} history={this.props.history} />
      </Layout>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SignUpPage;
