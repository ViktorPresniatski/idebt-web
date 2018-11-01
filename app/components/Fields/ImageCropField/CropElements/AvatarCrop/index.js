import React from 'react';
import IconCamera from 'components/Svgs/IconCamera';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './styles.scss';

export default class AvatarCrop extends React.Component {
  render() {
    return (
      <div className="file add_photo">
        <div className="file__icon">
          <IconCamera />
          <div className="file__plus">+</div>
        </div>
        <div className="file__text">
          <FormattedMessage {...messages.text} />
        </div>
      </div>
    );
  }
}
