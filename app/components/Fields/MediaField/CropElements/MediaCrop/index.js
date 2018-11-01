import React from 'react';
import IconRectangle from 'components/Svgs/IconRectangle';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './styles.scss';

export default class MediaCrop extends React.Component {
  render() {
    return (
      <div className="file add-media">
        <div className="file-container">
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
