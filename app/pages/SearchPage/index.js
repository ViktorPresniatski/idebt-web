import React from 'react';
import PropTypes from 'prop-types';

import SearchContainer from 'containers/SearchContainer';

export class SearchPage extends React.PureComponent {
  render() {
    return <SearchContainer location={this.props.location} />;
  }
}

SearchPage.propTypes = {
  location: PropTypes.object,
};

export default SearchPage;
