import React from 'react';
import PropTypes from 'prop-types';

import DebtsContainer from 'containers/DebtsContainer';

export class DebtsPage extends React.PureComponent {
  render() {
    return <DebtsContainer location={this.props.location} />;
  }
}

DebtsPage.propTypes = {
  location: PropTypes.object,
};

export default DebtsPage;
