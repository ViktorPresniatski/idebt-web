import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import IconRectangle from 'components/Svgs/IconRectangle';

import messages from './messages';
import './styles.scss';

export default class DropdownView extends React.Component {
  render() {
    const { label } = this.props;

    return (
      <div className="file add-file">
        <div className="file-container">
          {label && <div className="file-title">{label}</div>}
          <div className="file-icon">
            <IconRectangle />
            <div className="file-plus">+</div>
          </div>
          <div className="file-text">
            <FormattedMessage {...messages.text} />
          </div>
        </div>
      </div>
    );
  }
}

DropdownView.propTypes = {
  label: PropTypes.element,
};
