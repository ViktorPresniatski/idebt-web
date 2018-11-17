import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from 'containers/Dashboard';

export class HomePage extends React.PureComponent {
  render() {
    return <Dashboard location={this.props.location} />;
  }
}

HomePage.propTypes = {
  location: PropTypes.object,
};

export default HomePage;
